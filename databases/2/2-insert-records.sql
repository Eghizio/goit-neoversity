-- Insert teachers first (since students reference teachers)
INSERT INTO teachers (name) VALUES 
('John Smith'),
('Mary Johnson'),
('David Brown');

-- Insert students (referencing teacher IDs)
INSERT INTO students (name, teacher_id) VALUES 
('Alice Wilson', 1),
('Bob Davis', 1),
('Carol Miller', 2),
('Daniel Garcia', 3);

-- Insert books (referencing student IDs)
INSERT INTO books (title, student_id) VALUES 
('Mathematics Textbook', 1),
('Science Handbook', 1),
('History Book', 2),
('Literature Collection', 3),
('Physics Guide', 4);

-- Examples of different INSERT variations:

-- Insert with only required fields (using defaults for others)
INSERT INTO students (name) VALUES ('Eve Thompson');

-- Insert without specifying column names (must include all columns in order)
INSERT INTO teachers VALUES (NULL, 'Robert Wilson', NULL);

-- Insert multiple records at once
INSERT INTO books (title, student_id) VALUES 
('Chemistry Lab Manual', 2),
('Art Appreciation', 3),
('Computer Programming', NULL);

-- Insert with explicit NULL values
INSERT INTO students (name, teacher_id) VALUES ('Frank Miller', NULL);

-- Queries
SELECT 
    s.id AS student_id,
    s.name AS student_name,
    t.id AS teacher_id,
    t.name AS teacher_name,
    b.id AS book_id,
    b.title AS book_title
FROM students s
LEFT JOIN teachers t ON s.teacher_id = t.id
LEFT JOIN books b ON s.id = b.student_id
ORDER BY s.id, b.id;

SELECT 
    s.id AS student_id,
    s.name AS student_name,
    t.id AS assigned_teacher_id,
    t.name AS assigned_teacher_name,
    mentor_student.name AS mentor_student_name,
    b.id AS book_id,
    b.title AS book_title
FROM students s
LEFT JOIN teachers t ON s.teacher_id = t.id
LEFT JOIN students mentor_student ON t.student_id = mentor_student.id
LEFT JOIN books b ON s.id = b.student_id
ORDER BY s.id, b.id;
