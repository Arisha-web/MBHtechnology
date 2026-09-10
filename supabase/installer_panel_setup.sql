-- MBH Technology Installer Panel database setup
-- Run once in Supabase SQL Editor.

create table if not exists public.installers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  city text,
  skills text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(email)
);

alter table public.service_requests
  add column if not exists installer_id uuid references public.installers(id) on delete set null,
  add column if not exists installer_notes text;

alter table public.installers enable row level security;

drop policy if exists "Admins manage installers" on public.installers;
create policy "Admins manage installers"
on public.installers for all to authenticated
using (exists(select 1 from public.admins a where a.user_id=auth.uid()))
with check (exists(select 1 from public.admins a where a.user_id=auth.uid()));

drop policy if exists "Installers view own profile" on public.installers;
create policy "Installers view own profile"
on public.installers for select to authenticated
using (user_id=auth.uid() and is_active=true);

drop policy if exists "Installers view assigned jobs" on public.service_requests;
create policy "Installers view assigned jobs"
on public.service_requests for select to authenticated
using (
  installer_id in (
    select i.id from public.installers i
    where i.user_id=auth.uid() and i.is_active=true
  )
);

create or replace function public.link_mbh_installer()
returns trigger language plpgsql security definer set search_path=public
as $$
begin
  update public.installers
  set user_id=new.id
  where lower(email)=lower(new.email) and user_id is null;
  return new;
end $$;

drop trigger if exists on_mbh_installer_user_created on auth.users;
create trigger on_mbh_installer_user_created
after insert on auth.users
for each row execute function public.link_mbh_installer();

-- Link installers whose Auth accounts already exist.
update public.installers i
set user_id=u.id
from auth.users u
where lower(i.email)=lower(u.email) and i.user_id is null;

create or replace function public.installer_update_job(
  p_request_id uuid,
  p_status text,
  p_notes text default null
)
returns void language plpgsql security definer set search_path=public
as $$
begin
  if p_status not in ('Technician Assigned','Work in Progress','Completed') then
    raise exception 'Invalid job status';
  end if;

  update public.service_requests r
  set status=p_status,
      installer_notes=coalesce(p_notes,r.installer_notes),
      updated_at=now()
  where r.id=p_request_id
    and r.installer_id in (
      select i.id from public.installers i
      where i.user_id=auth.uid() and i.is_active=true
    );

  if not found then raise exception 'Job not found or access denied'; end if;
end $$;

revoke all on function public.installer_update_job(uuid,text,text) from public;
grant execute on function public.installer_update_job(uuid,text,text) to authenticated;
