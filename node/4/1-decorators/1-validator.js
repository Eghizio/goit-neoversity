const sum = (a, b) => a + b;

const WithRequiredIntegerArgs = (fn) => {
  return (...args) => {
    const argumentsAreNotIntegers = args.some((arg) => !Number.isInteger(arg));
    if (argumentsAreNotIntegers) {
      throw new Error("All provided arguments must be integers!");
    }

    return fn(...args);
  };
};

const IntegerSum = WithRequiredIntegerArgs(sum);

const integersTotal = IntegerSum(2, 2);
console.log({ integersTotal }, "\n");

try {
  const floatsTotal = IntegerSum(4.2, 3.14);
  console.log({ floatsTotal }, "\n");
} catch (error) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "There was an error while calculating sum...\n"
  );
}

const floatsTotal = IntegerSum(4.2, 3.14);
console.log({ floatsTotal }, "\n");

console.log("Finished!");
