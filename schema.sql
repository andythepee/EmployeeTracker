-- Create the database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- Use the database
USE employee_db;

-- Create department table
CREATE TABLE department (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

-- Create roles table
CREATE TABLE roles ( 
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INTEGER,
);

-- Create employee table
CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
);
