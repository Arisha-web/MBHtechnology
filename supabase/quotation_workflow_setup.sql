-- MBH Technology secure automatic quotation workflow
-- Run once in Supabase SQL Editor after the main MBH setup.

alter table public.quotations
  add column if not exists customer_notes text,
  add column if not exists approved_at timestamptz,
  add column if not exists valid_until date;

create sequence if not exists public.mbh_quotation_seq start 1001;

insert into public.product_categories(name) values
 ('CCTV Surveillance'),('Network Infrastructure'),('IP Telephony & PABX'),
 ('Wireless & P2P Links'),('Computers & Equipment'),('Fire Alarm Systems'),
 ('Electrical & UPS'),('Satellite VSAT'),('Security Services')
on conflict(name) do nothing;

create or replace function public.create_customer_quotation(
  p_customer_name text,
  p_phone text,
  p_location text,
  p_items jsonb,
  p_customer_notes text default null
)
returns table(quotation_no text,tracking_token uuid,grand_total numeric)
language plpgsql security definer set search_path=public
as $$
declare
  v_quote_id uuid;
  v_no text;
  v_token uuid;
  v_subtotal numeric:=0;
  v_installation numeric:=0;
  v_testing numeric:=0;
  v_grand numeric:=0;
  v_item jsonb;
  v_product public.products%rowtype;
  v_qty numeric;
begin
  if length(trim(coalesce(p_customer_name,'')))<2 then raise exception 'Customer name is required'; end if;
  if length(trim(coalesce(p_phone,'')))<7 then raise exception 'Valid phone is required'; end if;
  if jsonb_typeof(p_items)<>'array' or jsonb_array_length(p_items)=0 then raise exception 'Select at least one product'; end if;
  if jsonb_array_length(p_items)>50 then raise exception 'Too many quotation items'; end if;

  v_no:='MBH-Q-'||to_char(current_date,'YYYYMM')||'-'||lpad(nextval('public.mbh_quotation_seq')::text,5,'0');

  insert into public.quotations(quotation_no,customer_name,phone,location,status,customer_notes,valid_until)
  values(v_no,trim(p_customer_name),trim(p_phone),trim(p_location),'Pending Approval',p_customer_notes,current_date+interval '15 days')
  returning id,public.quotations.tracking_token into v_quote_id,v_token;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_qty:=coalesce((v_item->>'quantity')::numeric,0);
    if v_qty<=0 or v_qty>10000 then raise exception 'Invalid quantity'; end if;

    select * into v_product from public.products
    where id=(v_item->>'product_id')::uuid and is_active=true;

    if not found then raise exception 'Product unavailable'; end if;

    insert into public.quotation_items(
      quotation_id,product_id,description,quantity,final_unit_price,
      installation_charge,testing_charge,line_total
    ) values(
      v_quote_id,v_product.id,
      concat_ws(' ',v_product.brand,v_product.model,v_product.product_name),
      v_qty,v_product.final_unit_price,
      v_product.installation_charge,v_product.testing_charge,
      round(v_qty*(v_product.final_unit_price+v_product.installation_charge+v_product.testing_charge),2)
    );

    v_subtotal:=v_subtotal+(v_qty*v_product.final_unit_price);
    v_installation:=v_installation+(v_qty*v_product.installation_charge);
    v_testing:=v_testing+(v_qty*v_product.testing_charge);
  end loop;

  v_grand:=round(v_subtotal+v_installation+v_testing,2);
  update public.quotations q set
    subtotal=round(v_subtotal,2),
    installation_total=round(v_installation,2),
    testing_total=round(v_testing,2),
    grand_total=v_grand
  where q.id=v_quote_id;

  return query select v_no,v_token,v_grand;
end $$;

create or replace function public.track_customer_quotation(p_tracking_token uuid)
returns table(
  quotation_no text,customer_name text,location text,subtotal numeric,
  installation_total numeric,testing_total numeric,tax_total numeric,
  grand_total numeric,status text,created_at timestamptz,valid_until date
)
language sql security definer set search_path=public
as $$
 select q.quotation_no,q.customer_name,q.location,q.subtotal,
        q.installation_total,q.testing_total,q.tax_total,q.grand_total,
        q.status,q.created_at,q.valid_until
 from public.quotations q where q.tracking_token=p_tracking_token
$$;

revoke all on function public.create_customer_quotation(text,text,text,jsonb,text) from public;
grant execute on function public.create_customer_quotation(text,text,text,jsonb,text) to anon,authenticated;
revoke all on function public.track_customer_quotation(uuid) from public;
grant execute on function public.track_customer_quotation(uuid) to anon,authenticated;
