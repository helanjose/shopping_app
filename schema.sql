DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE table products(item_id integer  auto_increment PRIMARY KEY,product_name varchar(70),department_name VARCHAR(50),price integer,stock_quantity INTEGER );