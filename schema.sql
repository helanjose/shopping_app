DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE table products(item_id integer  auto_increment PRIMARY KEY,product_name varchar(70),department_name VARCHAR(50),price integer,stock_quantity INTEGER );

ALTER TABLE products
ADD product_sales INTEGER ;

update products t inner join products s 
on s.item_id=t.item_id set  t.product_sales= s.product_sales+50
where s.item_id=1;


CREATE TABLE departments(department_id INTEGER PRIMARY KEY,department_name VARCHAR(80),over_head_costs INTEGER);


select departments.department_id,departments.department_name,departments.over_head_costs,
product_sales, product_sales-departments.over_head_costs as total_profit
from departments  left outer join  
(select sum(product_sales) as product_sales,department_name from  products group by   department_name) sales
on sales.department_name=departments.department_name
group by departments.department_id,departments.department_name,departments.over_head_costs;






