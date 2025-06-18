-- Second Normal Form (2NF) - Remove partial dependencies

DROP TABLE IF EXISTS Students_2NF;
DROP TABLE IF EXISTS Classes_2NF;
DROP TABLE IF EXISTS Enrollments_2NF;

CREATE TABLE Students_2NF (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL,
    StudentEmail VARCHAR(100) NOT NULL
);

CREATE TABLE Classes_2NF (
    ClassID INT PRIMARY KEY,
    ClassName VARCHAR(50) NOT NULL,
    TeacherName VARCHAR(100) NOT NULL
);

-- Junction table
CREATE TABLE Enrollments_2NF (
    StudentID INT,
    ClassID INT,
    PRIMARY KEY (StudentID, ClassID),
    FOREIGN KEY (StudentID) REFERENCES Students_2NF(StudentID),
    FOREIGN KEY (ClassID) REFERENCES Classes_2NF(ClassID)
);

INSERT INTO Students_2NF VALUES
(1, 'John', 'john@email.com'),
(2, 'Mary', 'mary@email.com'),
(3, 'Bob', 'bob@email.com');

INSERT INTO Classes_2NF VALUES
(101, 'Math', 'Mr. Smith'),
(102, 'Science', 'Ms. Jones'),
(103, 'Art', 'Ms. Brown'),
(104, 'English', 'Mr. Davis');

INSERT INTO Enrollments_2NF VALUES
(1, 101), -- John -> Math
(1, 102), -- John -> Science
(1, 103), -- John -> Art
(2, 101), -- Mary -> Math
(2, 104), -- Mary -> English
(3, 102); -- Bob -> Science

SELECT s.StudentName, c.ClassName, c.TeacherName 
FROM Students_2NF s
JOIN Enrollments_2NF e ON s.StudentID = e.StudentID
JOIN Classes_2NF c ON e.ClassID = c.ClassID
ORDER BY s.StudentName, c.ClassName;
