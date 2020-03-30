drop table if exists users;

create table users (
    id int auto_increment primary key,
    username varchar(100) unique,
    salt varchar(16),
    password varchar(100)
);