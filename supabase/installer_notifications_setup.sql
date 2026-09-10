-- MBH Technology automatic category dispatch + installer acceptance workflow
-- Run once after installer_panel_setup.sql.

alter table public.installers
  add column if not exists categories text[] not null default '{}';

create table if not exists public.installer_job_offers (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  installer_id uuid not null references public.installers(id) on delete cascade,
  status text not null default 'Pending'
    check (status in ('Pending','Accepted','Declined','Approved','Rejected')),
  notified_at timestamptz not null default now(),
  responded_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  unique(request_id,installer_id)
);

alter table public.installer_job_offers enable row level security;

drop policy if exists "Admins manage installer offers" on public.installer_job_offers;
create policy "Admins manage installer offers"
on public.installer_job_offers for all to authenticated
using (exists(select 1 from public.admins a where a.user_id=auth.uid()))
with check (exists(select 1 from public.admins a where a.user_id=auth.uid()));

drop policy if exists "Installers view own offers" on public.installer_job_offers;
create policy "Installers view own offers"
on public.installer_job_offers for select to authenticated
using (
  installer_id in (
    select i.id from public.installers i
    where i.user_id=auth.uid() and i.is_active=true
  )
);

create or replace function public.mbh_job_category(p_service text)
returns text language sql immutable
as $$
  select case
    when p_service ilike '%cctv%' or p_service ilike '%surveillance%' then 'cctv'
    when p_service ilike '%network%' or p_service ilike '%wireless%' or p_service ilike '%fiber%' or p_service ilike '%p2p%' then 'network'
    when p_service ilike '%telephony%' or p_service ilike '%pabx%' or p_service ilike '%phone%' then 'telephony'
    when p_service ilike '%computer%' or p_service ilike '%laptop%' or p_service ilike '%desktop%' or p_service ilike '%equipment%' or p_service ilike '%printer%' then 'computers'
    when p_service ilike '%fire%' or p_service ilike '%alarm%' then 'fire_alarm'
    when p_service ilike '%satellite%' or p_service ilike '%vsat%' then 'vsat'
    when p_service ilike '%security%' or p_service ilike '%guard%' then 'security'
    when p_service ilike '%electric%' or p_service ilike '%ups%' or p_service ilike '%power%' then 'electrical'
    else 'other'
  end
$$;

create or replace function public.dispatch_mbh_job()
returns trigger language plpgsql security definer set search_path=public
as $$
declare v_category text;
begin
  v_category:=public.mbh_job_category(new.service);
  insert into public.installer_job_offers(request_id,installer_id)
  select new.id,i.id
  from public.installers i
  where i.is_active=true
    and (
      v_category=any(i.categories)
      or lower(coalesce(i.skills,'')) like '%'||replace(v_category,'_',' ')||'%'
      or (v_category='cctv' and lower(coalesce(i.skills,'')) like '%surveillance%')
      or (v_category='network' and (lower(coalesce(i.skills,'')) like '%fiber%' or lower(coalesce(i.skills,'')) like '%wireless%'))
    )
  on conflict(request_id,installer_id) do nothing;
  return new;
end $$;

drop trigger if exists on_mbh_service_request_dispatch on public.service_requests;
create trigger on_mbh_service_request_dispatch
after insert on public.service_requests
for each row execute function public.dispatch_mbh_job();

create or replace function public.installer_respond_offer(
  p_offer_id uuid,
  p_accept boolean
)
returns void language plpgsql security definer set search_path=public
as $$
begin
  update public.installer_job_offers o
  set status=case when p_accept then 'Accepted' else 'Declined' end,
      responded_at=now()
  where o.id=p_offer_id and o.status='Pending'
    and o.installer_id in (
      select i.id from public.installers i
      where i.user_id=auth.uid() and i.is_active=true
    );
  if not found then raise exception 'Offer not found or already answered'; end if;
end $$;

create or replace function public.admin_approve_installer_offer(p_offer_id uuid)
returns void language plpgsql security definer set search_path=public
as $$
declare v_request uuid; v_installer uuid;
begin
  if not exists(select 1 from public.admins a where a.user_id=auth.uid()) then
    raise exception 'Admin access required';
  end if;

  select request_id,installer_id into v_request,v_installer
  from public.installer_job_offers
  where id=p_offer_id and status='Accepted';

  if v_request is null then raise exception 'Accepted offer not found'; end if;

  update public.service_requests
  set installer_id=v_installer,status='Technician Assigned',updated_at=now()
  where id=v_request;

  update public.installer_job_offers
  set status=case when id=p_offer_id then 'Approved' else 'Rejected' end,
      approved_at=case when id=p_offer_id then now() else approved_at end
  where request_id=v_request and status in ('Pending','Accepted');
end $$;

revoke all on function public.installer_respond_offer(uuid,boolean) from public;
grant execute on function public.installer_respond_offer(uuid,boolean) to authenticated;
revoke all on function public.admin_approve_installer_offer(uuid) from public;
grant execute on function public.admin_approve_installer_offer(uuid) to authenticated;

-- Create offers for existing unassigned requests.
insert into public.installer_job_offers(request_id,installer_id)
select r.id,i.id
from public.service_requests r
join public.installers i on i.is_active=true
where r.installer_id is null
  and (
    public.mbh_job_category(r.service)=any(i.categories)
    or lower(coalesce(i.skills,'')) like '%'||replace(public.mbh_job_category(r.service),'_',' ')||'%'
  )
on conflict(request_id,installer_id) do nothing;
