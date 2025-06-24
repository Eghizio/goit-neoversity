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

-- Aggregations
SELECT COUNT(*) as total_employees FROM employees;

SELECT AVG(salary) as average_salary FROM employees;

SELECT
    MAX(salary) as highest_salary,
    MIN(salary) as lowest_salary
FROM employees;

SELECT SUM(budget) as total_budget FROM departments;

SELECT
    department_id,
    AVG(salary) as avg_salary,
    COUNT(*) as employee_count
FROM employees
GROUP BY
    department_id;

-- Grouping / Sorting
SELECT first_name, last_name, salary
FROM employees 
ORDER BY salary DESC;

SELECT department_id, COUNT(*) as employee_count
FROM employees 
GROUP BY department_id
HAVING COUNT(*) > 1;

SELECT department_id, is_active, COUNT(*) as count
FROM employees 
GROUP BY department_id, is_active
ORDER BY department_id, is_active;

-- Unique & Limits
SELECT DISTINCT department_id FROM employees;

SELECT first_name, last_name, salary
FROM employees 
ORDER BY salary DESC
LIMIT 3;

SELECT first_name, last_name, hire_date
FROM employees 
ORDER BY hire_date
LIMIT 2 OFFSET 2;