CREATE DATABASE resume;

DROP TABLE IF EXSIST users;
DROP TABLE IF EXSIST links;


CREATE USER dbuser WITH ENCRYPTED PASSWORD 'password';
grant connect on database resume to dbuser;

CREATE TABLE users (
  id serial primary key,
  name varchar(50) not null unique,
  password varchar(10) not null
);

grant USAGE ,select on sequence users_id_seq to dbuser;
grant ALL privileges on table users to dbuser;


CREATE TABLE links (
  id int not null,
  shortLink varchar(50) not null,
  longLink varchar(100) not null,
  count int
);

grant USAGE ,select on sequence links_id_seq to dbuser;
grant ALL privileges on table links to dbuser;
