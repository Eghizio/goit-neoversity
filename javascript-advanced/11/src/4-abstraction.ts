import { Colors } from "./colors";
export {};

abstract class User {
  readonly name: string;
  private age: number;
  private email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  introduceYourself() {
    console.log(`I'm User and my name is ${this.name}.`);
  }

  /* public by default */
  setAge(newAge: number) {
    if (newAge <= this.age) {
      console.warn(Colors.Red, `${this.name} can't get any younger.`);
      return;
    }

    this.age = newAge;
  }

  public sendEmail({ name }: User, message: string) {
    const footer = this.createEmailFooter(name);

    const emailBody = `${message}\n${footer}`;

    console.log(Colors.Cyan, `\nSending email to ${this.email}:`);
    console.log(emailBody, "\n");
  }

  private createEmailFooter(name: string): string {
    const sentDate = new Date().toLocaleString();

    return `Sent by ${name} on ${sentDate}`;
  }
}

class Profesor extends User {
  private students: Map<string, Student>;

  constructor(name: string, age: number) {
    super(`Profesor ${name}`, age, `${name.toLowerCase()}@professor.com`);
    this.students = new Map();
  }

  /* overriding base method from User parent class */
  introduceYourself() {
    console.log(Colors.Magenta, `I'm ${this.name}.`);
  }

  addStudent(student: Student) {
    this.students.set(student.studentId, student);
  }

  removeStudent({ studentId }: Student) {
    this.students.delete(studentId);
  }

  hasStudent(student: Student): boolean {
    return this.students.has(student.studentId);
  }

  enrollStudents(student: Student[]) {
    student.forEach((student) => this.addStudent(student));
  }
}

class Student extends User {
  readonly studentId: string;

  constructor(name: string, age: number) {
    super(name, age, `${name.toLowerCase()}@student.com`);
    this.studentId = crypto.randomUUID();
  }

  /* overriding base method from User parent class */
  introduceYourself() {
    console.log(`I'm Student and my student ID is ${this.studentId}.`);
  }
}

/* Abstract class instances are not allowed */
// const john = new User("John", 69, "john@doe.com"); /* Ooopsie */

/* Array of abstract Super type containing children type objects */
const users: User[] = [
  new Student("Viktor", 30),
  new Profesor("Heimerdinger", 301),
];

users.forEach((user) => {
  user.introduceYourself();
});

const beth = new Student("Beth", 21);

const adam = new Profesor("Adam", 42);

// john.introduceYourself();
beth.introduceYourself();
adam.introduceYourself();

function graduateStudent(student: Student, professor: Profesor) {
  student.sendEmail(professor, "Congratulations on Your graduation!");

  console.log(
    Colors.Yellow,
    `${student.name} graduated and is no longer a student.`
  );

  professor.removeStudent(student);
}

const cecil = new Student("Cecil", 20);
const dorthy = new Student("Dorthy", 19);

const someStudents = [beth, cecil, dorthy, new Student("Edmund", 22)];

adam.enrollStudents(someStudents);

console.log("\nIs Beth Adam's student:", adam.hasStudent(beth));

graduateStudent(beth, adam);
graduateStudent(dorthy, adam);

console.log("Is Beth Adam's student:", adam.hasStudent(beth));

/* Abstracted implementation */
class Scientist {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  power(a: number, b: number): number {
    return Math.pow(a, b);
  }
}

class Mathematician extends Scientist {
  power(x: number, y: number): number {
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Invalid argument type");
    }

    if (y === 0) return 1;

    if (y % 2 === 0) {
      return (
        this.power(x, parseInt((y / 2).toFixed(0))) *
        this.power(x, parseInt((y / 2).toFixed(0)))
      );
    }

    return (
      x *
      this.power(x, parseInt((y / 2).toFixed(0))) *
      this.power(x, parseInt((y / 2).toFixed(0)))
    );
  }
}

class Physicist extends Scientist {
  power(a: number, b: number) {
    return a ** b;
  }
}

// const scientistA = new Scientist("A");
// const scientistB = new Mathematician("B");
// const scientistC = new Physicist("C");

// const a = scientistA.power(2, 3);
// const b = scientistB.power(2, 3);
// const c = scientistC.power(2, 3);

// console.log({ a, b, c });

// const scientists = [scientistA, scientistB, scientistC];
// const results = scientists.map((scientist) => scientist.power(2, 4));

// console.log(results);
