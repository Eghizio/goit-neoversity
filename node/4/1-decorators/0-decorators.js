const sum = (a, b) => a + b;

const WithNameLogging = (fn) => {
  return (...args) => {
    console.log(`Function called: "${fn.name}"`);

    return fn(...args);
  };
};

const decoratedSum = WithNameLogging(sum);

const total = sum(2, 2);
console.log({ total }, "\n");

const decoratedTotal = decoratedSum(2, 2);
console.log({ decoratedTotal }, "\n");

const result = WithNameLogging(Math.max)(2, 5, 1);
console.log({ result });
