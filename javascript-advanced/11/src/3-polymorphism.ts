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
    console.log(Colors.Gray, `I'm User and my name is ${this.name}.`);
  }
}

class Profesor extends User {
  readonly title: string;

  constructor(name: string, age: number) {
    super(name, age, `${name.toLowerCase()}@professor.com`);
    this.title = "Profesor";
  }

  /* overriding base method from User parent class */
  introduceYourself() {
    console.log(Colors.Magenta, `I'm ${this.title} ${this.name}.`);
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
    console.log(`I'm Student and my student ID is:\n${this.studentId}.`);
  }
}

const john = new User("John", 69, "john@doe.com");
const beth = new Student("Beth", 21);
const adam = new Profesor("Adam", 42);

john.introduceYourself();
beth.introduceYourself();
adam.introduceYourself();

/* Function overloading, polymorphic function. Does not work in TypeScript as is. */
type Rectangle = { width: number; height: number };
type Square = { side: number };
// function calculateRectangleArea({ width, height }: Rectangle): number {
//   return width * height;
// }
// function calculateRectangleArea({ side }: Square): number {
//   return side * side;
// }
function calculateRectangleArea(width: number, height: number): number {
  return width * height;
}

/* Adapter */
const getAreaForRectangle = (rectangle: Rectangle): number => {
  return calculateRectangleArea(rectangle.width, rectangle.height);
};

const getAreaForSquare = (square: Square): number => {
  return calculateRectangleArea(square.side, square.side);
};
