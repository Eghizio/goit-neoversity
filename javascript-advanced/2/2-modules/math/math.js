/* Named exports */
export const add = (a, b) => a + b;

export const substract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => a / b;

export const remainder = (a, b) => a % b;




/* Default export */
export default {
    add: (a, b) => a + b,
    substract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    remainder: (a, b) => a % b,
    // sum: add,
};
