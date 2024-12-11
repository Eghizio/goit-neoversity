export {};

/* Return type */
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(1, 2));

const sum = (a: number, b: number): number => a + b;

console.log(sum(3, 4));

/* Inference */
const multiply = (a: number, b: number) => a * b;

console.log(multiply(5, 6));

/* Void type */
function printHello(): void {
  console.log("Hello, World!");
}

const voidInYourSoul = printHello();

console.log(voidInYourSoul);

/* Never type */

function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

function getCriticalChance(damage: number): number | never {
  const chance = Math.random();

  if (chance > 1) {
    return error("We will never reach it");
  }

  if (chance > 0.5) {
    return damage * 2;
  }

  return damage;
}

let nope: never;
// nope = 1; /* Ooopsie */

/* Custom Function type */
type Callback = (element: number, index: number, array: number[]) => number;

function arrayMap(arr: number[], callback: Callback): number[] {
  return arr.map(callback);
}

console.log(arrayMap([1, 2, 3], (x) => x * 2));
// console.log(arrayMap([1, 2, 3], (x) => x.toString()); /* Ooopsie */
