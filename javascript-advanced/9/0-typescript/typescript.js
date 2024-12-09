console.log("Hello from TypeScript 👋");
console.log(1 + 1);
console.log("1" + "1");
// function sum(a, b) {
//     return a + b;
// }
function sum(a, b) {
  return a + b;
}
// /* Type inference for return value. */
// function sum(a: number, b: number) {
//     return a + b;
// }
console.log(sum(1, 1));
// console.log(sum("1", "1")); /* Error: Type 'string' is not assignable to type 'number'. */
