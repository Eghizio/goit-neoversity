/* Named Exports */
export const random = (max) => 1 + Math.floor(Math.random() * max);


export default {
    random: (max) => 1 + Math.floor(Math.random() * max),
    someOtherThing: "abc",
};

/* Module evaluation */
// console.log("Hello from random.js");