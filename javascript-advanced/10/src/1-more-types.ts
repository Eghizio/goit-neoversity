export {};

/* Any */
let anyVar: any = 123;
anyVar = "Hello, World!";
anyVar = true;

let num: number = 42;
num = anyVar;

const double = (a: number) => a * 2;

console.log(double(num)); /* Ooopsie */

/* Unknown */
let unknownVar: unknown = 123;
anyVar = "Hello, World!";
anyVar = true;

// num = unknownVar; /* Ooopsie */

// console.log(double(unknownVar)); /* Ooopsie */

if (typeof unknownVar === "number") {
  console.log(double(unknownVar)); /* Ok */
}

/* Tuples */
let tuple: [number, string, boolean] = [1, "Hello", true];
let tuple2: [string, ...number[]] = ["Adam", 42, 1337];
// let tuple3: [number, number] = [1, 2, 3]; /* Ooopsie */

// tuple.push(null); /* Ooopsie */
tuple.push("42"); /* Ok, sadly. */

/* Enum */
enum Color {
  RED,
  GREEN,
  BLUE,
}

console.log(Color.RED);
console.log(Color[Color.RED]);

enum Status {
  Active = "ACTIVE",
  Offline = "OFFLINE",
  Deactivated = "DEACTIVATED",
}

console.log(Status.Active);

const makeStatusMessage = (status: Status): string => {
  switch (status) {
    case Status.Active:
      return "User is active.";
    case Status.Offline:
      return "User is offline.";
    case Status.Deactivated:
      return "User is deactivated.";
    default:
      throw new Error(`Invalid status of "${status}"`);
  }
};

for (const status in Status) {
  console.log(status);
}

/* Const Enum */
const enum ConstColor {
  RED = "#ff0000",
  GREEN = "#00ff00",
  BLUE = "#0000ff",
}

const offlineColor = ConstColor.RED; /* Check transpilation output */

// for (const color in ConstColor) { /* Ooopsie */
//   console.log(color);
// }

/* Unions */
type UnionType = string | number | boolean;

let unionVar: UnionType = "Hello";
unionVar = 42;
unionVar = true;
// unionVar = null; /* Ooopsie */

type Role = "Admin" | "User";
let role: Role = "Admin";
role = "User";
// role = "Mod"; /* Ooopsie */

type Swimmable = {
  swim: () => void;
};

type Flyable = {
  fly: () => void;
};

let duck: Swimmable | Flyable;

const swimmingContest = (animal: Swimmable) => {
  animal.swim();
};

const flyingContest = (animal: Flyable) => {
  animal.fly();
};

// swimmingContest(duck); /* Ooopsie */
// flyingContest(duck); /* Ooopsie */

duck = {
  swim: () => {},
  fly: () => {},
};

// swimmingContest(duck); /* Still not good */
// flyingContest(duck); /* Still not good */

if ("swim" in duck) swimmingContest(duck);
if ("fly" in duck) flyingContest(duck);

/* Intersection */
type Animal = {
  name: string;
  age: number;
};

type Bird = {
  wings: number;
};

const Donald: Animal & Bird = {
  name: "The Duck",
  age: 1,
  wings: 2,
};

/* Type Literals */
type ColorLiteral = "red" | "green" | "blue";

let color1: ColorLiteral = "red";
let color2: ColorLiteral = "green";
// color1 = "yellow"; /* Ooopsie */

type Variant = "primary" | "secondary" | "danger";

const getButtonStyles = (variant: Variant) => {
  switch (variant) {
    case "primary":
      return { backgroundColor: "#333", color: "#fff" };
    case "secondary":
      return { backgroundColor: "#fff", color: "#333" };
    case "danger":
      return { backgroundColor: "#f00", color: "#fff" };
    default:
      throw new Error(`Invalid variant of "${variant}"`);
  }
};
