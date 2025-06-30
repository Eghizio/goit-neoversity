USE business_db;

DELIMITER //

CREATE PROCEDURE GetCustomerDetails(id INT)
BEGIN
    SELECT *
    FROM customers
    WHERE customer_id = id;
END //

DELIMITER ;

CALL GetCustomerDetails(1);

DROP PROCEDURE IF EXISTS GetCustomerDetails;
