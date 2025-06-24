-- Create
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

-- Edit
ALTER TABLE employees 
ADD COLUMN middle_name VARCHAR(50) AFTER first_name;

ALTER TABLE employees 
ADD COLUMN birth_date DATE,
ADD COLUMN emergency_contact VARCHAR(100);

ALTER TABLE employees 
MODIFY COLUMN phone VARCHAR(15);

ALTER TABLE employees 
CHANGE COLUMN phone phone_number VARCHAR(15);

ALTER TABLE employees 
DROP COLUMN middle_name;

ALTER TABLE employees 
ADD INDEX idx_last_name (last_name);

ALTER TABLE employees 
ADD CONSTRAINT uk_employee_email UNIQUE (email);

ALTER TABLE employees 
RENAME TO staff_members;

ALTER TABLE staff_members 
RENAME TO employees;

-- Drop
CREATE TABLE to_drop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

DROP TABLE IF EXISTS to_drop;

-- Database column rename migration without downtime
-- 0. Setup
CREATE TABLE IF NOT EXISTS workers ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL );
-- 1. Add column with new name
ALTER TABLE workers ADD COLUMN full_name VARCHAR(255);
-- 2. Start writing to both columns from your systems/applications
-- 3. Backfill missing values in a new column
UPDATE workers SET full_name = name WHERE full_name is NULL;
-- 4. Ensure the new column fully covers the data from the old one
SELECT COUNT(*) FROM `workers` WHERE full_name is NULL;
-- 5. Stop writing to & reading from the old column and start reading from the new one
-- 6. Remove old column when not used
ALTER TABLE workers DROP COLUMN name;