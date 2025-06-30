USE business_db;

-- Total orders per customer
SELECT
	c.customer_id,
    first_name,
    last_name,
    (
        SELECT COUNT(*) FROM orders o
     	WHERE o.customer_id = c.customer_id
    ) as total_orders
FROM customers c;

-- Find customers with the highest order amount
SELECT first_name, last_name, email, o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.total_amount = (SELECT MAX(total_amount) FROM orders);

-- Average order amount by customer status
SELECT
    c.customer_id,
    c.first_name, 
    c.last_name,
    AVG(o.total_amount) AS avg_order_amount,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY avg_order_amount DESC;

-- Customers with recent orders
WITH LastMonthOrder AS (
    SELECT order_id, customer_id, total_amount, created_at
    FROM orders
    WHERE created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH)
)
SELECT 
	lmo.order_id, lmo.customer_id,
    c.first_name, c.last_name,
	lmo.total_amount, lmo.created_at
FROM LastMonthOrder lmo
RIGHT JOIN customers c ON lmo.customer_id = c.customer_id;

-- Create new leads from customers with multiple enrollments
INSERT INTO leads (
    first_name,
    last_name,
    email,
    phone,
    source,
    status,
    notes
)
SELECT
    c.first_name,
    c.last_name,
    c.email,
    c.phone,
    'existing_customer' as source,
    'qualified' as status,
    CONCAT('Customer with ', COUNT(ec.enrollment_id), ' enrollments') as notes
FROM customers c
JOIN enrolled_customers ec ON c.customer_id = ec.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.phone
HAVING COUNT(ec.enrollment_id) >= 2
LIMIT 5;
