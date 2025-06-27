-- Init Schema
CREATE DATABASE business_db;

USE business_db;

-- Tables definition
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE leads (
    lead_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    source VARCHAR(50),
    status VARCHAR(20) DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrolled_customers (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    enrollment_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Altering tables
ALTER TABLE customers ADD COLUMN date_of_birth DATE;

ALTER TABLE orders
ADD COLUMN discount_amount DECIMAL(8, 2) DEFAULT 0.00;

ALTER TABLE leads MODIFY COLUMN status VARCHAR(30) DEFAULT 'new';

ALTER TABLE customers ADD INDEX idx_email (email);

ALTER TABLE orders ADD INDEX idx_order_date (order_date);

ALTER TABLE leads
ADD CONSTRAINT chk_status CHECK (
    status IN (
        'new',
        'contacted',
        'qualified',
        'converted',
        'lost'
    )
);

-- Truncate tables
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE orders;

TRUNCATE TABLE enrolled_customers;

TRUNCATE TABLE leads;

TRUNCATE TABLE customers;

SET FOREIGN_KEY_CHECKS = 1;

-- Drop tables
DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS enrolled_customers;

DROP TABLE IF EXISTS leads;

DROP TABLE IF EXISTS customers;

-- Drop database
DROP DATABASE IF EXISTS business_db;