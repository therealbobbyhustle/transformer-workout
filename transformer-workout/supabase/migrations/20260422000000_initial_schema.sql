-- Run this in your Supabase SQL editor to set up the database

-- User progress table (one row per user)
create table if not exists user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  completed_days_count integer default 0,
  percent_complete integer default 0,
  current_day_number integer default 1,
  started_at timestamptz default now(),
  completed_at timestamptz
);

-- Day completions table (one row per user per day)
create table if not exists day_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_number integer not null check (day_number between 1 and 21),
  completed boolean default false,
  completed_at timestamptz,
  unique(user_id, day_number)
);

-- Weekly check-ins table
create table if not exists weekly_check_ins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  week_number integer not null check (week_number between 1 and 3),
  workouts_completed integer default 0,
  energy_rating integer check (energy_rating between 1 and 5),
  consistency_rating integer check (consistency_rating between 1 and 5),
  biggest_win text,
  biggest_struggle text,
  created_at timestamptz default now(),
  unique(user_id, week_number)
);

-- Nutrition logs table (one row per user per day)
create table if not exists nutrition_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  water_complete boolean default false,
  protein_complete boolean default false,
  on_plan_complete boolean default false,
  better_choices_complete boolean default false,
  unique(user_id, date)
);

-- Enable Row Level Security on all tables
alter table user_progress enable row level security;
alter table day_completions enable row level security;
alter table weekly_check_ins enable row level security;
alter table nutrition_logs enable row level security;

-- RLS Policies: users can only read and write their own data
create policy "Users can manage their own progress"
  on user_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own day completions"
  on day_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own check-ins"
  on weekly_check_ins for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own nutrition logs"
  on nutrition_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
