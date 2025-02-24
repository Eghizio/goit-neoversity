import { Counter } from "../components/Counter";
import { useCounter } from "../useCounter";

export const Counters = () => {
  const counter1 = useCounter();
  const counter2 = useCounter();
  const counter3 = useCounter();

  return (
    <main className="col wide-gap">
      <Counter {...counter1} />
      <Counter {...counter2} />
      <Counter {...counter3} />
    </main>
  );
};
