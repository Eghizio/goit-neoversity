DROP PROCEDURE IF EXISTS while_example;

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS while_example()
DETERMINISTIC
BEGIN
    DECLARE counter INT DEFAULT 0;

    WHILE counter < 10 DO

        SELECT counter;

        SET counter = counter + 1;
    END WHILE;
END //

DELIMITER ;

CALL while_example();
