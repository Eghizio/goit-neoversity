-- Setup
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone CHAR(12),
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    profile_data JSON
);

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    budget DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    estimated_hours FLOAT,
    status VARCHAR(20) DEFAULT 'PLANNING'
);

-- Data
INSERT INTO departments (department_name, budget) VALUES
('Human Resources', 500000.00),
('Engineering', 2000000.00),
('Marketing', 750000.00),
('Sales', 1200000.00);

INSERT INTO employees (first_name, last_name, email, phone, hire_date, salary, department_id, last_login, profile_data) VALUES
('John', 'Doe', 'john.doe@company.com', '555-123-4567', '2023-01-15', 75000.00, 2, '2024-06-20 09:30:00', '{"skills": ["Python", "SQL"], "level": "Senior"}'),
('Jane', 'Smith', 'jane.smith@company.com', '555-234-5678', '2023-03-20', 82000.00, 2, '2024-06-21 10:15:00', '{"skills": ["Java", "React"], "level": "Lead"}'),
('Mike', 'Johnson', 'mike.johnson@company.com', '555-345-6789', '2023-05-10', 65000.00, 3, '2024-06-19 14:45:00', '{"skills": ["Marketing", "Analytics"], "level": "Mid"}'),
('Sarah', 'Williams', 'sarah.williams@company.com', '555-456-7890', '2022-11-05', 95000.00, 4, '2024-06-22 08:20:00', '{"skills": ["Sales", "CRM"], "level": "Senior"}');

INSERT INTO projects (project_name, description, start_date, end_date, estimated_hours, status) VALUES
('Website Redesign', 'Complete overhaul of company website', '2024-01-01', '2024-06-30', 480.5, 'IN_PROGRESS'),
('Mobile App Development', 'Native mobile app for iOS and Android', '2024-03-15', '2024-12-31', 1200.0, 'PLANNING'),
('Marketing Campaign Q3', 'Summer marketing campaign for new product launch', '2024-07-01', '2024-09-30', 320.75, 'PLANNING');

-- Query
SELECT * FROM employees;

SELECT first_name, last_name, email, salary FROM employees;

SELECT first_name, last_name, salary 
FROM employees 
WHERE salary > 70000;

SELECT first_name, last_name, department_id, hire_date
FROM employees 
WHERE department_id = 2 AND hire_date >= '2023-01-01';

SELECT first_name, last_name, email
FROM employees 
WHERE email LIKE '%@company.com';
