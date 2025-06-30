-- Multiply
-- DROP FUNCTION IF EXISTS Multiply;
DELIMITER //

CREATE FUNCTION IF NOT EXISTS Multiply(x INT, y INT) RETURNS INT
DETERMINISTIC 
NO SQL

BEGIN
    DECLARE result INT;
    SET result = x * y;
    RETURN result;
END //

DELIMITER ;

SELECT Multiply(2, 3);

-- CalculateSquare
DROP FUNCTION IF EXISTS CalculateSquare;

DELIMITER //

CREATE FUNCTION CalculateSquare(n INT)
RETURNS INT
DETERMINISTIC 
NO SQL
BEGIN
    DECLARE result INT;
    SET result = Multiply(n, n);
    RETURN result;
END //

DELIMITER ;

SELECT CalculateSquare (2);

-- BaseTokens
DROP FUNCTION IF EXISTS BaseTokens;

DELIMITER //

CREATE FUNCTION BaseTokens(role VARCHAR(255)) RETURNS INT
DETERMINISTIC
NO SQL
BEGIN
	DECLARE tokens INT DEFAULT 0;
    
    IF role = 'basic' THEN
    	SET tokens = 100;
    END IF;
    IF role = 'plus' THEN
    	SET tokens = 5000;
    END IF;
    IF role = 'pro' THEN
    	SET tokens = 40000;
    END IF;
    
    RETURN tokens;
END //
    
DELIMITER ;

SELECT BaseTokens('basic');

SELECT BaseTokens('plus');

SELECT BaseTokens('pro');

SELECT BaseTokens('dupa');
