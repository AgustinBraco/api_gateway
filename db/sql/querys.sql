-- Database
CREATE DATABASE api_gateway;
USE api_gateway;

-- Tables
CREATE TABLE IF NOT EXISTS products (
	product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	price INT(6) NOT NULL,
	stock INT(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	permission VARCHAR(5) NOT NULL
);