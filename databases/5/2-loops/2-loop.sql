DROP PROCEDURE IF EXISTS loop_example;

DELIMITER //

CREATE PROCEDURE loop_example()
DETERMINISTIC
BEGIN
    DECLARE counter INT DEFAULT 0;

    loop_label: LOOP
        
        SELECT counter;

        SET counter = counter + 1;
        IF counter >= 5 THEN
            LEAVE loop_label;
        END IF;
    END LOOP loop_label;
END //

DELIMITER ;

CALL loop_example();
