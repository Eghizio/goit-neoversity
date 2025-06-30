USE business_db;

-- Variable
SET @some_id = 1;

SELECT *
    FROM customers
    WHERE customer_id = @some_id;
    
SELECT *
    FROM orders
    WHERE customer_id = @some_id;

-- GetOrderDetails by order_id
DROP PROCEDURE IF EXISTS GetOrderDetails;

DELIMITER //

CREATE PROCEDURE GetOrderDetails(IN order_id_param INT)
READS SQL DATA
BEGIN
    DECLARE customer_name VARCHAR(255) DEFAULT 'Not found!';
    DECLARE order_total DECIMAL(10,2) DEFAULT 0.00;
    DECLARE order_status VARCHAR(20) DEFAULT 'Unknown';
    DECLARE payment_method VARCHAR(50) DEFAULT 'Not specified';

    SELECT
        CONCAT(c.first_name, ' ', c.last_name),
        o.total_amount,
        o.status,
        COALESCE(o.payment_method, 'Not specified')
    INTO 
        customer_name, 
        order_total, 
        order_status, 
        payment_method
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE o.order_id = order_id_param
    LIMIT 1;

    SELECT
        order_id_param as 'Requested Order ID',
        customer_name as 'Customer Name',
        order_total as 'Order Total',
        order_status as 'Order Status',
        payment_method as 'Payment Method';
END //

DELIMITER ;


CALL GetOrderDetails(1);

-- Default value
CALL GetOrderDetails(1337);
