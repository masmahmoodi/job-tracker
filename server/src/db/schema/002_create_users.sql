CREATE TABLE IF NOT EXISTS users (
    id serial  primary key,
    name text not null,
    email text not null unique,
    password_hash text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
)