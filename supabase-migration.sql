-- Templates table
create table templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  mode text not null default 'both',    -- 'solo' | 'duo' | 'both'
  shot_count int not null,              -- how many shots this template expects
  layout_config jsonb not null,         -- positions, sizes, rotations for each slot
  preview_url text,                     -- thumbnail for template picker
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Sessions table
create table sessions (
  id uuid primary key default gen_random_uuid(),
  mode text not null default 'solo',    -- 'solo' | 'duo'
  code char(6) unique,                  -- null for solo sessions, required for duo
  host_id uuid not null,               -- anonymous auth user id
  guest_id uuid,                        -- set when guest joins (duo only)
  template_id uuid references templates(id),
  shot_count int not null default 1,    -- 1–4
  status text not null default 'waiting', -- waiting | active | capturing | completed
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '1 hour')
);


-- Shots table
create table shots (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  shot_index int not null,              -- 0-based
  host_photo_url text,                  -- Storage path
  guest_photo_url text,                 -- Storage path
  captured_at timestamptz,
  created_at timestamptz default now()
);

-- Composites table (final rendered images)
create table composites (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  image_url text not null,              -- Storage path
  created_at timestamptz default now()
);

-- Enable RLS
alter table sessions enable row level security;

create policy "users can read own sessions"
on sessions
for select
to authenticated
using (
  auth.uid() = host_id
);

create policy "authenticated users can insert own sessions"
on sessions
for insert
to authenticated
with check (
  auth.uid() = host_id
);