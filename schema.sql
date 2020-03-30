drop table if exists users;

create table users (
    id int auto_increment primary key,
    username varchar(255) not null,
    salt varchar(16) not null,
    password varchar(255) not null,
    unique key 
) engine = InnoDB ;