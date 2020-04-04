drop table if exists users_categories;
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

create table users_categories (
    username varchar(100) references users(username),
    category varchar(100) references categories(category),
    value float not null,
    primary key (username, category)
);