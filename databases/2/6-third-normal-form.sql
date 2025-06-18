-- Third Normal Form (3NF) - Remove transitive dependencies

DROP TABLE IF EXISTS Enrollments_3NF;
DROP TABLE IF EXISTS Classes_3NF;
DROP TABLE IF EXISTS Teachers_3NF;
DROP TABLE IF EXISTS Students_3NF;

CREATE TABLE Teachers_3NF (
    TeacherID INT PRIMARY KEY,
    TeacherName VARCHAR(100) NOT NULL
);

CREATE TABLE Students_3NF (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL,
    StudentEmail VARCHAR(100) NOT NULL
);

CREATE TABLE Classes_3NF (
    ClassID INT PRIMARY KEY,
    ClassName VARCHAR(50) NOT NULL,
    TeacherID INT NOT NULL,
    FOREIGN KEY (TeacherID) REFERENCES Teachers_3NF(TeacherID)
);

CREATE TABLE Enrollments_3NF (
    StudentID INT,
    ClassID INT,
    PRIMARY KEY (StudentID, ClassID),
    FOREIGN KEY (StudentID) REFERENCES Students_3NF(StudentID),
    FOREIGN KEY (ClassID) REFERENCES Classes_3NF(ClassID)
);

INSERT INTO Teachers_3NF VALUES
(201, 'Mr. Smith'),
(202, 'Ms. Jones'),
(203, 'Ms. Brown'),
(204, 'Mr. Davis');

INSERT INTO Students_3NF VALUES
(1, 'John', 'john@email.com'),
(2, 'Mary', 'mary@email.com'),
(3, 'Bob', 'bob@email.com');

INSERT INTO Classes_3NF VALUES
(101, 'Math', 201),     -- Math taught by Mr. Smith
(102, 'Science', 202),  -- Science taught by Ms. Jones
(103, 'Art', 203),      -- Art taught by Ms. Brown
(104, 'English', 204);  -- English taught by Mr. Davis

INSERT INTO Enrollments_3NF VALUES
(1, 101), -- John -> Math
(1, 102), -- John -> Science
(1, 103), -- John -> Art
(2, 101), -- Mary -> Math
(2, 104), -- Mary -> English
(3, 102); -- Bob -> Science

SELECT 
    s.StudentName, 
    c.ClassName, 
    t.TeacherName 
FROM Students_3NF s
JOIN Enrollments_3NF e ON s.StudentID = e.StudentID
JOIN Classes_3NF c ON e.ClassID = c.ClassID
JOIN Teachers_3NF t ON c.TeacherID = t.TeacherID
ORDER BY s.StudentName, c.ClassName;
