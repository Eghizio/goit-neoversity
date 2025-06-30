-- DROP PROCEDURE IF EXISTS repeat_example;

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS repeat_example()
DETERMINISTIC
BEGIN
    DECLARE counter INT DEFAULT 0;
    
    REPEAT
        
        SELECT counter;
        
        SET counter = counter + 1;
    UNTIL counter >= 5
    END REPEAT;
END //

DELIMITER ;

CALL repeat_example();
