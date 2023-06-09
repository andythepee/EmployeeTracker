-- Create department table
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

-- Insert data into the department table
INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Marketing'),
  ('Finance'),
  ('IT'),
  ('Security');

-- Create role table
CREATE TABLE roles ( 
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Insert data into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Salesperson', 50000, 1),
  ('Marketing Coordinator', 40000, 2),
  ('Accountant', 60000, 3),
  ('Developer', 80000, 4),
  ('Cyber Security Analyst', 90000, 5);

-- Create employee table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Shawn', 'Michaels', 3, 2),
  ('Mark', 'Johnston', 4, 3),
  ('Andrew', 'Persaud', 5, 4),
  ('Jane', 'Doe', 1, NULL),
  ('Mike', 'Smith', 2, 1),
  ('Dwayne', 'Johnson', 3, 2),
  ('Mark', 'James', 4, 3),
  ('Stephen', 'Persaud', 5, 4),
  ('Jade', 'Dover', 1, NULL),
  ('Jennifer', 'Sims', 2, 1),
  ('Mick', 'Foley', 3, 2),
  ('Steve', 'Austin', 4, 3),
  ('Chris', 'Persaud', 5, 4);
