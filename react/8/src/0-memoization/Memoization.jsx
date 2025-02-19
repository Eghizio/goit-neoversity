import { useEffect, useMemo, useState } from "react";
import { Clock } from "./Clock";

const fibonacci = (n) =>
  n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);

const Answer = () => {
  const start = performance.now();
  const answer = fibonacci(42);
  const end = performance.now();

  const computeTime = end - start;

  return (
    <article className="border">
      <p>Fib (42): {answer}</p>
      <p>Time to compute: {computeTime} miliseconds</p>
    </article>
  );
};

const Fibonacci = ({ nth = 42 }) => {
  const [answer, setAnswer] = useState(null);
  const [computeTime, setComputeTime] = useState(0);

  if (isNaN(nth)) nth = 1;

  useEffect(() => {
    const start = performance.now();
    const answer = fibonacci(nth);
    const end = performance.now();

    setAnswer(answer);

    setComputeTime(end - start);
  }, [nth]);

  return (
    <article>
      <p>
        Fibonacci ({nth}): <span>{answer ? answer : "Computing..."}</span>
      </p>

      <p>
        Time to compute: <span>{computeTime.toFixed(6)} miliseconds</span>
      </p>
    </article>
  );
};

const MemoizedFibonacci = ({ nth = 42 }) => {
  if (isNaN(nth)) nth = 1;

  console.log("Rerendering Memoized Fibonacci...");

  const start = performance.now();
  const answer = useMemo(() => {
    console.log(`[${Date.now()}] Computing fibonacci(${nth})...`);
    return fibonacci(nth);
  }, [nth]);
  const end = performance.now();

  return (
    <article>
      <p>
        Fibonacci ({nth}): <span>{answer ? answer : "Computing..."}</span>
      </p>

      <p>
        Time to compute: <span>{end - start} miliseconds</span>
      </p>
    </article>
  );
};

const memory = new Map();

const expensiveCalculation = (a) => {
  const b = 2;

  if (memory.has(a)) {
    console.log(`Remembering result for a=${a} !`);
    return memory.get(a);
  }

  console.log(`Calculating expensive calculation for a=${a}...`);
  const result = a + b;

  memory.set(a, result);

  return result;
};

const MemoizationExplained = () => {
  const [result, setResult] = useState(0);

  const calculateResult = (event) => {
    event.preventDefault();

    const a = event.target.elements["a"].valueAsNumber;
    // const b = event.target.elements["b"].valueAsNumber;

    const result = expensiveCalculation(a);

    setResult(result);
  };

  return (
    <form onSubmit={calculateResult} className="border">
      <div>
        <input type="number" name="a" step="1" />
        +
        <input type="number" name="b" value="2" disabled />=
        <span style={{ border: "1px solid black", padding: "0 1rem" }}>
          {result}
        </span>
      </div>

      <button type="submit">Calculate result!</button>
    </form>
  );
};

export const Memoization = () => {
  const [n, setN] = useState(7);
  const [x, setX] = useState(7);

  return (
    <main className="col wide-gap">
      <h1>Memoization - useMemo Hook</h1>

      <Clock />

      {/* <Answer /> */}

      {/* <section className="border">
        <input
          type="number"
          step="1"
          min="0"
          max="50"
          value={n}
          onChange={(e) => setN(e.target.valueAsNumber)}
        />

        <Fibonacci nth={n} />
      </section> */}

      {/* <MemoizationExplained /> */}

      {/* <section className="border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setX(e.target.elements["n"].valueAsNumber);
          }}
        >
          <input
            name="n"
            type="number"
            step="1"
            min="0"
            max="50"
            defaultValue={x}
          />
          <button type="submit">Compute!</button>
        </form>

        <MemoizedFibonacci nth={x} />
      </section> */}
    </main>
  );
};
