export {};

/* Booleans */
let isAdmin: boolean = true;

isAdmin = false;
// isAdmin = "nope"; /* Ooopsie */

/* Numbers */

let num: number = 42;
num = 1337;
// num = true; /* Ooopsie */

let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

/* Strings */
let str: string = "Hello, World!";
str = "こんにちは、世界！";
// str = 42; /* Ooopsie */
str = (42).toString();

/* Null */
let nullVar: null = null;
// nullVar = undefined; /* Ooopsie */

/* Undefined */
let undefinedVar: undefined = undefined;
// undefinedVar = "not defined"; /* Ooopsie */

/* Object */
let user: { name: string; age: number } = { name: "John Doe", age: 42 };
user.name = "Jane Doe";
// user.age = "thirty"; /* Ooopsie */
// user.hobby = "Everything"; /* Ooopsie */

/* Arrays */
let numbers: number[] = [1, 2, 3, 4, 5];
let numbers2: Array<number> = [1, 2, 3, 4, 5];
numbers.push(6);
// numbers.push("7"); /* Ooopsie */

let strings: string[] = ["apple", "banana", "cherry"];
let strings2: Array<string> = ["apple", "banana", "cherry"];

let mixed: (number | string)[] = ["1", 2, "hehe", 0xd];
let mixed2: Array<number | string> = ["1", 2, "hehe", 0xd];

/* Array of objects */
let users: { name: string; age: number }[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { age: 42, name: "Bob" },
];

let users2: Array<{ name: string; age: number }> = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

/* With custom Type */
type User = {
  name: string;
  age: number;
};

let users3: User[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

let user4: Array<User> = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

let anything: any[] = [
  "hello",
  123,
  true,
  { name: "John", age: 30 },
  function () {},
];
