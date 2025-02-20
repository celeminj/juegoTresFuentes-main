create database scoreBD;
use scoreBD;

CREATE TABLE scores (
id_score INT AUTO_INCREMENT PRIMARY KEY,
punto INT NOT NULL
);

insert into scores (punto) values (300);
INSERT INTO scores (punto) VALUES (150);