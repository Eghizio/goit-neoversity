-- Setup
CREATE SCHEMA IF NOT EXISTS indexing_test_schema;

USE indexing_test_schema;

DROP TABLE IF EXISTS b_tree_table;

CREATE TABLE IF NOT EXISTS b_tree_table (
    id INT PRIMARY KEY auto_increment,
    random_value INT
);


-- Fill the data
DROP PROCEDURE IF EXISTS filling_b_tree_table;

DELIMITER //

CREATE PROCEDURE filling_b_tree_table(insert_number INTEGER)
BEGIN
  DECLARE counter INT DEFAULT 0;
	START TRANSACTION;

    WHILE counter < insert_number DO
        INSERT INTO b_tree_table (random_value) VALUES (FLOOR(RAND()*998+2));
        SET counter = counter + 1;
    END WHILE;

  COMMIT;
END //

DELIMITER ;

SELECT COUNT(*) FROM b_tree_table;

call filling_b_tree_table(100000);

SELECT COUNT(*) FROM b_tree_table;

SELECT * FROM b_tree_table LIMIT 5;


-- Check
SELECT COUNT(*)
FROM b_tree_table t1
INNER JOIN b_tree_table t2 ON t1.random_value = t2.random_value
WHERE t1.random_value < 30;

SELECT COUNT(*)
FROM b_tree_table t1
INNER JOIN b_tree_table t2 ON t1.random_value = t2.random_value
WHERE t1.random_value < 30;


-- B-tree Index
CREATE INDEX rvx ON b_tree_table(random_value);


-- Check again
SELECT COUNT(*)
FROM b_tree_table t1
INNER JOIN b_tree_table t2 ON t1.random_value = t2.random_value
WHERE t1.random_value < 30;

SELECT COUNT(*)
FROM b_tree_table t1
INNER JOIN b_tree_table t2 ON t1.random_value = t2.random_value
WHERE t1.random_value < 30;