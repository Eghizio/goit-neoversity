import { Counter } from "../components/Counter";
import { useCounter } from "../useCounter";

export const Products = () => {
  const counter = useCounter();

  console.log("%cRendering Products Page...", "color:magenta");

  return (
    <main className="col wide-gaps">
      <h2>Products</h2>
      <Counter {...counter} />
    </main>
  );
};
