-- B-tree Index
CREATE INDEX index_name ON table_name(column_name);


-- Function based Index
CREATE INDEX index_name ON table_name(UPPER(column_name));


-- Clustered Index
CREATE CLUSTERED INDEX index_name ON table_name(column_name);


-- Bitmap Index
CREATE BITMAP INDEX idx_bitmap_dep_id ON employees(dep_id);


-- Hash Index
CREATE TABLE example_table (
    id INT,
    name VARCHAR(255),
    INDEX hash_index (id) USING HASH
);
