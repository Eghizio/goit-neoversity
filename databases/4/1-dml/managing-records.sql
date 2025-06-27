-- Insert records
INSERT INTO customers (first_name, last_name, email, phone, address) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0101', '123 Main St, City, State'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0102', '456 Oak Ave, City, State'),
('Mike', 'Johnson', 'mike.johnson@email.com', '555-0103', '789 Pine Rd, City, State'),
('Sarah', 'Williams', 'sarah.williams@email.com', '555-0104', '321 Elm St, City, State'),
('David', 'Brown', 'david.brown@email.com', '555-0105', '654 Maple Dr, City, State');

INSERT INTO leads (first_name, last_name, email, phone, source, status, notes) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0101', 'website', 'converted', 'Existing customer'),
('Alice', 'Wilson', 'alice.wilson@email.com', '555-0201', 'social_media', 'new', 'Interested in premium package'),
('Bob', 'Davis', 'bob.davis@email.com', '555-0202', 'referral', 'contacted', 'Friend of existing customer'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0102', 'email_campaign', 'converted', 'Duplicate - existing customer'),
('Chris', 'Taylor', 'chris.taylor@email.com', '555-0203', 'website', 'new', 'Requested product demo');

INSERT INTO enrolled_customers (customer_id, email, class_name, enrollment_date, status) VALUES
(1, 'john.doe@email.com', 'Advanced SQL Course', '2024-01-15', 'active'),
(2, 'jane.smith@email.com', 'Web Development Bootcamp', '2024-01-20', 'active'),
(3, 'mike.johnson@email.com', 'Data Science Fundamentals', '2024-02-01', 'completed'),
(1, 'john.doe@email.com', 'Python Programming', '2024-02-10', 'active'),
(4, 'sarah.williams@email.com', 'Digital Marketing Course', '2024-02-15', 'active');

INSERT INTO orders (customer_id, order_date, total_amount, status, payment_method, shipping_address) VALUES
(1, '2024-01-10', 299.99, 'completed', 'credit_card', '123 Main St, City, State'),
(2, '2024-01-18', 499.99, 'completed', 'paypal', '456 Oak Ave, City, State'),
(3, '2024-01-25', 199.99, 'shipped', 'credit_card', '789 Pine Rd, City, State'),
(1, '2024-02-05', 149.99, 'completed', 'credit_card', '123 Main St, City, State'),
(4, '2024-02-12', 349.99, 'pending', 'bank_transfer', '321 Elm St, City, State'),
(5, '2024-02-20', 89.99, 'processing', 'credit_card', '654 Maple Dr, City, State');

-- Update records
UPDATE customers 
SET phone = '555-0199', address = '999 Updated St, New City, State'
WHERE customer_id = 1;

UPDATE customers 
SET email = 'john.doe.updated@email.com'
WHERE customer_id = 1;

UPDATE customers 
SET phone = CONCAT('555-', LPAD(customer_id + 1000, 4, '0'))
WHERE customer_id IN (2, 3, 4);

UPDATE leads 
SET status = 'converted', notes = 'Successfully converted to customer'
WHERE email = 'alice.wilson@email.com';

UPDATE leads 
SET status = 'contacted'
WHERE status = 'new';

UPDATE orders 
SET total_amount = total_amount * 0.9, discount_amount = total_amount * 0.1
WHERE customer_id = 1 AND status = 'pending';

-- Delete records
DELETE FROM leads 
WHERE status = 'lost' 
AND created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);

DELETE FROM orders 
WHERE status = 'cancelled' AND order_date < '2024-01-01';

DELETE FROM enrolled_customers 
WHERE status = 'dropped' AND enrollment_date < '2024-01-15';

DELETE l1 FROM leads l1
INNER JOIN leads l2 
WHERE l1.lead_id < l2.lead_id 
AND l1.email = l2.email;

DELETE FROM customers 
WHERE customer_id NOT IN (
    SELECT DISTINCT customer_id FROM orders
) AND customer_id NOT IN (
    SELECT DISTINCT customer_id FROM enrolled_customers
);

DELETE FROM orders 
WHERE status = 'completed' 
AND created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);

DELETE FROM leads 
WHERE status = 'unqualified' 
ORDER BY created_at ASC 
LIMIT 100;