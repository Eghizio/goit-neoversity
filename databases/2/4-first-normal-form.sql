-- First Normal Form (1NF) - "One thing per cell"

DROP TABLE IF EXISTS Students_1NF;

DROP TABLE IF EXISTS Student_Classes_1NF;

CREATE TABLE Students_1NF (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL,
    StudentEmail VARCHAR(100) NOT NULL
);

CREATE TABLE Student_Classes_1NF (
    StudentID INT,
    ClassName VARCHAR(50),
    TeacherName VARCHAR(100),
    PRIMARY KEY (StudentID, ClassName),
    FOREIGN KEY (StudentID) REFERENCES Students_1NF (StudentID)
);

INSERT INTO
    Students_1NF
VALUES (1, 'John', 'john@email.com'),
    (2, 'Mary', 'mary@email.com'),
    (3, 'Bob', 'bob@email.com');

INSERT INTO
    Student_Classes_1NF
VALUES (1, 'Math', 'Mr. Smith'),
    (1, 'Science', 'Ms. Jones'),
    (1, 'Art', 'Ms. Brown'),
    (2, 'Math', 'Mr. Smith'),
    (2, 'English', 'Mr. Davis'),
    (3, 'Science', 'Ms. Jones');


SELECT s.StudentName, sc.ClassName, sc.TeacherName
FROM
    Students_1NF s
    JOIN Student_Classes_1NF sc ON s.StudentID = sc.StudentID
ORDER BY s.StudentName, sc.ClassName;
