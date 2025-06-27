-- Get customers with their orders
SELECT c.customer_id, c.first_name, c.last_name, c.email, 
       o.order_id, o.order_date, o.total_amount, o.status
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;

-- Get enrolled customers with their customer details
SELECT c.first_name, c.last_name, c.email, c.phone,
       ec.class_name, ec.enrollment_date, ec.status as enrollment_status
FROM customers c
INNER JOIN enrolled_customers ec ON c.customer_id = ec.customer_id;

-- Get all customers and their orders (including customers with no orders)
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       o.order_id, o.order_date, o.total_amount, o.status
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;

-- Get all customers and their enrollments (including customers not enrolled)
SELECT c.first_name, c.last_name, c.email,
       ec.class_name, ec.enrollment_date, ec.status as enrollment_status
FROM customers c
LEFT JOIN enrolled_customers ec ON c.customer_id = ec.customer_id;

-- Get all orders and their customer details (in case there are orphaned orders)
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       o.order_id, o.order_date, o.total_amount, o.status
FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;

-- Get all enrollments and their customer details (in case there are orphaned enrollments)
SELECT c.first_name, c.last_name, c.email, c.phone,
       ec.enrollment_id, ec.class_name, ec.enrollment_date, ec.status
FROM customers c
RIGHT JOIN enrolled_customers ec ON c.customer_id = ec.customer_id;

-- Get all customers and orders (customers without orders + orders without customers)
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       o.order_id, o.order_date, o.total_amount, o.status
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
UNION
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       o.order_id, o.order_date, o.total_amount, o.status
FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;

-- Get all customers and enrollments (customers without enrollments + enrollments without customers)
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       ec.enrollment_id, ec.class_name, ec.enrollment_date, ec.status
FROM customers c
LEFT JOIN enrolled_customers ec ON c.customer_id = ec.customer_id
UNION
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       ec.enrollment_id, ec.class_name, ec.enrollment_date, ec.status
FROM customers c
RIGHT JOIN enrolled_customers ec ON c.customer_id = ec.customer_id;

-- Create all possible combinations of customers and available classes
SELECT c.customer_id, c.first_name, c.last_name, c.email,
       DISTINCT ec.class_name
FROM customers c
CROSS JOIN (SELECT DISTINCT class_name FROM enrolled_customers) ec;

-- Create a matrix of all customers with all possible order statuses
SELECT c.customer_id, c.first_name, c.last_name,
       status_list.status_name
FROM customers c
CROSS JOIN (
    SELECT 'pending' as status_name
    UNION SELECT 'processing'
    UNION SELECT 'shipped'
    UNION SELECT 'completed'
    UNION SELECT 'cancelled'
) status_list;