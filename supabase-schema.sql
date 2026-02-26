-- Vehicles Table
create table if not exists vehicles (
  id text primary key,
  name text not null,
  category text not null,
  year integer,
  description text,
  topSpeed integer,
  acceleration integer,
  handling integer,
  price integer
);

-- Hardware Stats Table
create table if not exists hardware_stats (
  id serial primary key,
  avgGpu text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Release Dates Table
create table if not exists release_dates (
  id serial primary key,
  game text,
  releaseDate text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
