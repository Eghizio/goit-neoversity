// import * as CustomMath from "./math/math.js";
// import { random } from "./math/random.js";

/* `import from barrel` */
import { CustomMath, CustomRandom } from "./math/index.js";
// const { random } = CustomRandom;
// const { add, substract, multiply, divide, remainder } = CustomMath;

// import MathModule from "./math/index.js";
// const { add, substract, multiply, divide, remainder, random } = MathModule;

import MathModule, { add, substract, multiply, divide, remainder } from "./math/math.js";
import { random } from "./math/random.js";

// const x = 5, y = 2;
const x = random(100), y = random(100);

console.log(`X = ${x} \nY = ${y}`);

console.log(`Add(${x}, ${y}):`,         add(x, y));
console.log(`Substract(${x}, ${y}):`,   substract(x, y));
console.log(`Multiply(${x}, ${y}):`,    multiply(x, y));
console.log(`Divide(${x}, ${y}):`,      divide(x, y));
console.log(`Remainder(${x}, ${y}):`,   remainder(x, y));

console.log("\n".repeat(3));

console.log(`Add(${x}, ${y}):`,         MathModule.add(x, y));
console.log(`Substract(${x}, ${y}):`,   MathModule.substract(x, y));
console.log(`Multiply(${x}, ${y}):`,    MathModule.multiply(x, y));
console.log(`Divide(${x}, ${y}):`,      MathModule.divide(x, y));
console.log(`Remainder(${x}, ${y}):`,   MathModule.remainder(x, y));

console.log("\n".repeat(6));

console.log(`Add(${x}, ${y}):`, CustomMath.add(x, y));
console.log(`Substract(${x}, ${y}):`, CustomMath.substract(x, y));
console.log(`Multiply(${x}, ${y}):`, CustomMath.multiply(x, y));
console.log(`Divide(${x}, ${y}):`, CustomMath.divide(x, y));
console.log(`Remainder(${x}, ${y}):`, CustomMath.remainder(x, y));
