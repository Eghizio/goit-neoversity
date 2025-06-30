USE business_db;

DROP PROCEDURE IF EXISTS ApplyDiscountToFirstOrders;

DELIMITER $$

CREATE PROCEDURE ApplyDiscountToFirstOrders(orders_amount INT)
BEGIN
    DECLARE counter INT DEFAULT 0;
    DECLARE o_id INT DEFAULT NULL;
    
    SELECT MIN(order_id) INTO o_id FROM orders LIMIT 1;

    loop_label: LOOP
        IF o_id is NULL THEN
            LEAVE loop_label;
        END IF;
        
        UPDATE orders
        SET total_amount = total_amount * 0.8
        WHERE order_id = o_id;
        
        SET counter = counter + 1;
    	IF counter >= orders_amount THEN
            LEAVE loop_label;
        END IF;

        SELECT MIN(order_id) INTO o_id FROM orders WHERE order_id > o_id;

    END LOOP loop_label;

	SELECT CONCAT('Applied discount to ', counter,' orders.') as report; 
END $$

DELIMITER ;

CALL ApplyDiscountToFirstOrders(3);
