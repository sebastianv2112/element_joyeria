-- Products table
create table if not exists products (
  id bigint primary key,
  name text not null,
  slug text unique not null,
  price integer not null,
  category text not null,
  collection text,
  size text,
  country text,
  country_code text,
  description text,
  material text,
  color text,
  featured boolean default false,
  new boolean default false,
  images text[] not null default '{}',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table products enable row level security;

-- Allow public read access
create policy "Products are viewable by everyone"
  on products for select
  using (true);

-- Index for common queries
create index if not exists idx_products_category on products(category);
create index if not exists idx_products_slug on products(slug);
