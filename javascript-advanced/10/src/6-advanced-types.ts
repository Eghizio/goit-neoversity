export {};

/* Type Guards */

const randomValue = Math.random() > 0.5 ? "Hello" : 42;

// randomValue.toUpperCase(); /* Ooopsie */

/* typeof */
if (typeof randomValue === "string") {
  console.log(randomValue.toUpperCase()); /* Ok */
} else {
  console.log(randomValue);
}

/* in */
type Flyable = {
  fly: () => void;
};

type Swimable = {
  swim: () => void;
};

const animal: Flyable | Swimable = { swim: () => {} };

const doAFlip = (something: Flyable | Swimable) => {
  if ("fly" in something) {
    something.fly();
  } else {
    something.swim();
  }
};

doAFlip(animal);

const flyingContest = (thing: Flyable) => {
  thing.fly();
  thing.fly();
  thing.fly();
};

// flyingContest(animal); /* Ooopsie */

/* instanceof */

class Car {
  drive(): void {}
}

class Airplane {
  fly(): void {}
}

const car = new Car();
const airplane = new Airplane();

const travel = (vehicle: Car | Airplane) => {
  if (vehicle instanceof Car) {
    return vehicle.drive();
  } else if (vehicle instanceof Airplane) {
    vehicle.fly();
  }

  /* We've narrowed down the type to Airplane */
  vehicle.fly();
};

travel(car);
travel(airplane);

/* Custom Type Guards */
const isCar = (vehicle: Car | Airplane): vehicle is Car => "drive" in vehicle;

if (isCar(car)) {
  car.drive();
}

if (isCar(airplane)) {
  airplane.drive(); /* Never happening, unless we do some JS Runtime bamboozle */
}

let vehicle: Car | Airplane = new Airplane();

if (isCar(vehicle)) {
  vehicle.drive(); /* Never happening, unless we reasign vehicle to Car */
}

if (isCar(vehicle)) {
  vehicle.drive();
}

/* Type Casting */

const honda: unknown = new Car();

// honda.drive(); /* Ooopsie */
(honda as Car).drive();

// honda.fly(); /* Ooopsie */
(honda as Airplane).fly(); /* Kaboom incoming */

const form = document.querySelector("#our-form");
// const elems = form.elements; /* Ooopsie */
const elements = (form as HTMLFormElement).elements; /* Ok */

const realForm = document.querySelector("form");
// const formElements = realForm.elements; /* Ooopsie */
const formElements2 = realForm?.elements; /* Ok */
if (realForm) {
  const formElements2 = realForm.elements; /* Ok */
}

const getElement = <T extends keyof HTMLElementTagNameMap>(selector: T) => {
  const element = document.querySelector(selector);
  if (element === null) {
    throw new Error(`Element not found: ${selector}`);
  }
  return element;
};

const formElement = getElement("form");
formElement.elements;

getElement("button").click();

/* Indexed properties */

type Dictionary = {
  [key: string]: number;
};

const myDict: Dictionary = {
  one: 1,
  two: 2,
};

myDict["three"] = 3;

/* Function overloading */

function greet(name: string): string;
function greet(name: number): string;
function greet(name: any): string {
  return `Hello, ${name}!`;
}

greet("Adam");
greet(42);

function returnOther(value: string): string;
function returnOther(value: number): number;
function returnOther(value: string | number): string | number {
  return value;
}

const x = returnOther("42");
const y = returnOther(42);
