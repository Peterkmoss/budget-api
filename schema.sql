drop table if exists users;

create table users (
    id int auto_increment primary key,
    username varchar(255) unique,
    salt varchar(16),
    password varchar(255)
);