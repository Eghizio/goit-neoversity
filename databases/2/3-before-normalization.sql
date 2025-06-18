-- Before normalization - Denormalized
DROP TABLE IF EXISTS Student_Classes_Denormalized;


CREATE TABLE Student_Classes_Denormalized (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100),
    StudentEmail VARCHAR(100),
    Class1 VARCHAR(50),
    Class1Teacher VARCHAR(100),
    Class2 VARCHAR(50),
    Class2Teacher VARCHAR(100),
    Class3 VARCHAR(50),
    Class3Teacher VARCHAR(100)
);


INSERT INTO Student_Classes_Denormalized VALUES
(1, 'John', 'john@email.com', 'Math', 'Mr. Smith', 'Science', 'Ms. Jones', 'Art', 'Ms. Brown'),
(2, 'Mary', 'mary@email.com', 'Math', 'Mr. Smith', 'English', 'Mr. Davis', NULL, NULL),
(3, 'Bob', 'bob@email.com', 'Science', 'Ms. Jones', NULL, NULL, NULL, NULL);


SELECT * FROM Student_Classes_Denormalized;
