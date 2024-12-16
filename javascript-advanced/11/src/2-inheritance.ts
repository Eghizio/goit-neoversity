import { Colors } from "./colors";

export {};

class User {
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

export class Student extends User {
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

class Profesor extends User {
  private students: Map<string, Student>;

  constructor(name: string, age: number) {
    super(`Profesor ${name}`, age, `${name.toLowerCase()}@professor.com`);
    this.students = new Map();
  }

  /* overriding base method from User parent class */
  introduceYourself() {
    console.log(`I'm Profesor ${this.name}.`);
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
}

const john = new User("John", 69, "john@doe.com");

const beth = new Student("Beth", 21);

const adam = new Profesor("Adam", 42);

// john.introduceYourself();
// beth.introduceYourself();
// adam.introduceYourself();

// adam.addStudent(beth);

// console.log("\nIs Beth Adam's student:", adam.hasStudent(beth));

// beth.sendEmail(adam, "Congratulations on Your graduation!");

// console.log("Beth graduated and is no longer a student.");
// adam.removeStudent(beth);

// console.log("Is Beth Adam's student:", adam.hasStudent(beth));
