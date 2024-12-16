import { Colors } from "./colors";

export {};

// Constructor shorthand.
// Fields, Methods and access modifiers (public, private, protected).
// Readonly.
// Static.
// Getters/Setters
// Abstract class.

class User {
  constructor(
    readonly name: string,
    // private _age: number,
    protected _age: number,
    readonly email: string
  ) {}

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0 || value <= this._age) {
      console.error(
        Colors.Red,
        `Invalid age "${value}". User cannot get younger.`
      );
      return;
    }

    console.log(Colors.Green, `User's age updated to ${value}`);
    this._age = value;
  }
}

// const adam = new User("Adam", 42, "adam@user.com");

// adam.age = 21;
// console.log(`Adam has birthdays: ${adam.age}`);
// adam.age++;
// adam.age++;

interface UniversityStudent {
  study(): void;
}

class Student extends User implements UniversityStudent {
  static students: Student[] = [];

  constructor(name: string, age: number, email: string) {
    super(name, age, email);
    Student.students.push(this);
  }

  static expellStudent(student: Student): void {
    console.log(
      Colors.Red,
      `\nExpelling student ${student.name} from the system.\n`
    );
    Student.students = Student.students.filter((s) => s !== student);
  }

  study(): void {
    console.log(`Student ${this.name} is studying.`);
  }

  birthday() {
    console.log(Colors.Magenta, `${this.name} has a birthday!`);
    this._age = this._age + 1;
  }
}

const beth = new Student("Beth", 21, "beth@student.com");
beth.study();

console.log(beth.age);
beth.birthday();
console.log(beth.age);

const cecil = new Student("Cecil", 20, "cecil@student.com");

console.log("\nFirst semester:", Student.students);

Student.expellStudent(cecil);
console.log("\nSecond semester:", Student.students);

abstract class Exam {
  abstract grade(student: Student): void;

  conduct(student: Student): void {
    console.log(Colors.Magenta, `Conducting exam for ${student.name}`);
    this.grade(student);
  }
}

class MathExam extends Exam {
  grade({ name }: Student) {
    console.log(Colors.Cyan, "[Math] Required 80% to pass!");

    const hasPassed = this.isPassing();
    const result = hasPassed ? "Passed" : "Failed";
    const color = hasPassed ? Colors.Green : Colors.Red;

    console.log(color, `[${name}] Result: ${result}`);
  }

  private isPassing(): boolean {
    const userScore = Math.round(Math.random() * 100);

    const minScore = 80;

    return userScore >= minScore;
  }
}

class PEExam extends Exam {
  grade({ name }: Student): void {
    console.log(Colors.Cyan, "[Physical Education] Required 50% to pass!");

    const hasPassed = this.isFitEnoguh();
    const result = hasPassed ? "Passed" : "Failed";
    const color = hasPassed ? Colors.Green : Colors.Red;

    console.log(color, `[${name}] Result: ${result}`);
  }

  private isFitEnoguh(): boolean {
    const isTeacherCoolEnough = Math.random() > 0.2;
    if (isTeacherCoolEnough) return true;

    return Math.round(Math.random() * 100) >= 50;
  }
}

// new Exam().grade(); /* Ooopsie */
new MathExam().grade(beth);
new PEExam().grade(beth);

new MathExam().conduct(beth);
new PEExam().conduct(beth);
