import { useState } from "react";

export const useCounter = (initialCount = 0, step = 1) => {
  const [counter, setCounter] = useState(initialCount);

  const bumpCounter = () => setCounter((p) => p + step);

  return [counter, bumpCounter];
};
