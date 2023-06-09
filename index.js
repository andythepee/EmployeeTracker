const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'andyp123',
    database: 'employee_db',
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
    start();
});

// Function to start the application
function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Exiting application...');
                    connection.end();
                    break;
            }
        })
        .catch((err) => {
            console.error(err);
            connection.end();
        });
}

// Function to view all departments
function viewDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    });
}

// Function to view all roles
function viewRoles() {
    connection.query(
        'SELECT role.*, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id',
        (err, results) => {
            if (err) throw err;
            console.table(results);
            start();
        }
    );
}

// Function to view all employees
function viewEmployees() {
    connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id',
        (err, results) => {
            if (err) throw err;
            console.table(results);
            start();
        }
    );
}

// Function to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the department ID:',
            },
            {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
            },
        ])
        .then((answers) => {
            connection.query(
                'INSERT INTO department (id, name) VALUES (?, ?)',
                [answers.id, answers.name],
                (err, results) => {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    start();
                }
            );
        })
        .catch((err) => {
            console.error(err);
            start();
        });
}

// Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the role ID:',
            },
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary:',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID:',
            },
        ])
        .then((answers) => {
            connection.query(
                'INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?)',
                [answers.id, answers.title, answers.salary, answers.department_id],
                (err, results) => {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    start();
                }
            );
        })
        .catch((err) => {
            console.error(err);
            start();
        });
}

// Function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the employee ID:',
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee last name:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role ID:',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID (leave blank if none):',
            },
        ])
        .then((answers) => {
            connection.query(
                'INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)',
                [
                    answers.id,
                    answers.first_name,
                    answers.last_name,
                    answers.role_id,
                    answers.manager_id || null,
                ],
                (err, results) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    start();
                }
            );
        })
        .catch((err) => {
            console.error(err);
            start();
        });
}

// Function to update an employee role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the employee ID:',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the new role ID:',
            },
        ])
        .then((answers) => {
            connection.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [answers.role_id, answers.employee_id],
                (err, results) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    start();
                }
            );
        })
        .catch((err) => {
            console.error(err);
            start();
        });
}
