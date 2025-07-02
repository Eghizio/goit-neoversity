USE business_db;

-- Example Queries with Transactions.

-- Convert Lead to Customer and Create Order
START TRANSACTION;

-- Insert new customer from lead data
INSERT INTO customers (first_name, last_name, email, phone, address)
SELECT first_name, last_name, email, phone, 'Address to be updated'
FROM leads 
WHERE status = 'qualified'
LIMIT 1;

SET @new_customer_id = LAST_INSERT_ID();

-- Create an order for the new customer
INSERT INTO orders (customer_id, order_date, total_amount, status, payment_method)
VALUES (@new_customer_id, CURDATE(), 299.99, 'confirmed', 'credit_card');

UPDATE leads 
SET status = 'converted' 
WHERE lead_id = 1;

COMMIT;



-- Enroll Customer in Class and Update Order Status
START TRANSACTION;

-- Enroll customer in a class
INSERT INTO enrolled_customers (customer_id, email, class_name, enrollment_date, status)
VALUES (1, 'john.doe@email.com', 'Advanced Marketing Course', CURDATE(), 'active');

-- Update related order status to completed
UPDATE orders 
SET status = 'completed' 
WHERE customer_id = 1 AND order_id = 1;

-- Verify the customer exists before committing
SELECT COUNT(*) INTO @customer_exists 
FROM customers 
WHERE customer_id = 1;

-- Only commit if customer exists
IF @customer_exists > 0 THEN
    COMMIT;
ELSE
    ROLLBACK;
END IF;



-- Batch Update Customer Information
START TRANSACTION;

-- SET @updated_email = 'jane.smith.updated@email.com';

-- Update customer information
UPDATE customers 
SET email = 'jane.smith.updated@email.com', phone = '555-1337'
WHERE customer_id = 2;

-- Update email in enrolled_customers table to maintain consistency
UPDATE enrolled_customers 
SET email = 'jane.smith.updated@email.com'
WHERE customer_id = 2;

COMMIT;



-- Cancel order and handle enrollment if applicable
START TRANSACTION;

-- Update order status to cancelled
UPDATE orders 
SET status = 'cancelled' 
WHERE order_id = 3 AND status IN ('pending', 'confirmed');

-- If this order was for a class, update enrollment status
UPDATE enrolled_customers 
SET status = 'cancelled' 
WHERE customer_id = (SELECT customer_id FROM orders WHERE order_id = 3)
AND enrollment_date = (SELECT order_date FROM orders WHERE order_id = 3);

-- Check if any rows were actually updated
SELECT ROW_COUNT() INTO @rows_affected;

-- Only commit if we actually cancelled something
IF @rows_affected > 0 THEN
    COMMIT;
    SELECT 'Order cancelled successfully' AS result;
ELSE
    ROLLBACK;
    SELECT 'No eligible order found to cancel' AS result;
END IF;



-- Rollback example
START TRANSACTION;

-- Try to create an order with invalid amount
INSERT INTO orders (customer_id, order_date, total_amount, status)
VALUES (1, CURDATE(), -100.00, 'pending');

-- Check if amount is negative (business rule violation)
SELECT total_amount INTO @order_amount 
FROM orders 
WHERE order_id = LAST_INSERT_ID();

-- Rollback if business rule is violated
IF @order_amount < 0 THEN
    ROLLBACK;
    SELECT 'Transaction rolled back: Negative order amount not allowed' AS message;
ELSE
    COMMIT;
    SELECT 'Order created successfully' AS message;
END IF;
