class Log {
  static info = (msg) => console.log("\x1b[36m%s\x1b[0m", msg);
  static success = (msg) => console.log("\x1b[32m%s\x1b[0m", msg);
  static error = (msg) => console.log("\x1b[31m%s\x1b[0m", msg);
}

const fib = (n) => {
  if (n <= 1) return n;

  return fib(n - 1) + fib(n - 2);
};

const WithCache = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      Log.success(`[cache] Hit!`);
      return cache.get(key);
    }

    Log.error(`[cache] Miss!`);

    const result = fn(...args); // Decorated function call.

    Log.info(`[cache] Caching result...`);
    cache.set(key, result);

    return result;
  };
};

const MemoizedFibonacci = WithCache(fib);

console.log("42", MemoizedFibonacci(42), "\n");
console.log("45", MemoizedFibonacci(45), "\n");

console.log("42", MemoizedFibonacci(42), "\n");
console.log("45", MemoizedFibonacci(45), "\n");
