-- Add foreign key constraints after creating all tables
ALTER TABLE students
ADD CONSTRAINT fk_students_teacher FOREIGN KEY (teacher_id) REFERENCES teachers (id);

ALTER TABLE teachers
ADD CONSTRAINT fk_teachers_student FOREIGN KEY (student_id) REFERENCES students (id);

ALTER TABLE books
ADD CONSTRAINT fk_books_student FOREIGN KEY (student_id) REFERENCES students (id);
