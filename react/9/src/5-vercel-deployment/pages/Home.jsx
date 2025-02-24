import { Counter } from "../components/Counter";
import { useCounter } from "../useCounter";

export const Home = () => {
  const { count, increment, decrement, reset } = useCounter();

  console.log("%cRendering Home Page...", "color:cyan");

  return (
    <main className="col wide-gaps">
      <h2>Home</h2>
      <Counter
        count={count}
        increment={increment}
        decrement={decrement}
        reset={reset}
      />
    </main>
  );
};
