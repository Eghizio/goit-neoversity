import { useState } from "react";

export const useCounter = (initialCount = 0, step = 1) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((c) => c + step);

  const decrement = () => setCount((c) => c - step);

  const reset = () => setCount(initialCount);

  return { count, increment, decrement, reset };
};
