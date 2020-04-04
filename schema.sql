drop table if exists budgets_categories;
drop table if exists users;
drop table if exists categories;

create table users (
    id int auto_increment primary key,
    username varchar(100) not null unique,
    password varchar(255) not null
);

create table categories (
    id int auto_increment primary key,
    category varchar(100) not null unique
);

create table budgets_categories (
    user_id int references users(username),
    category_id int references categories(category),
    monthly_value int,
    primary key (user_id, category_id)
);