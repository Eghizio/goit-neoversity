/* Passing the state, elevating and sharing */
import { useState } from "react";

const style = {
  orange: { backgroundColor: "orange" },
  green: { backgroundColor: "lime" },
  red: { backgroundColor: "red" },
};

const Counter = ({ count, increment, decrement, step }) => {
  return (
    <div className="row">
      <button style={style.red} type="button" onClick={() => decrement(step)}>
        -
      </button>

      <span>{count}</span>

      <button style={style.green} type="button" onClick={() => increment(step)}>
        +
      </button>
    </div>
  );
};

const SharedCounters = ({ startingValue }) => {
  const [count, setCount] = useState(startingValue);

  const increment = (step) => setCount((p) => p + step);
  const decrement = (step) => setCount((p) => p - step);

  return (
    <div className="col wide-gap">
      <Counter
        count={count}
        increment={increment}
        decrement={decrement}
        step={7}
      />
      <Counter
        count={count}
        increment={increment}
        decrement={decrement}
        step={-3}
      />
    </div>
  );
};

const Child = ({ changeNumber }) => {
  const submitNumber = (event) => {
    event.preventDefault();

    const number = event.target.elements["num"].valueAsNumber;

    changeNumber(number);

    event.target.reset();
  };

  const randomNumber = () => {
    const random = Math.round(Math.random() * 1_000);
    changeNumber(random);
  };

  return (
    <div className="col border">
      <form onSubmit={submitNumber}>
        <label className="col">
          New favorite number:
          <input type="number" name="num" placeholder="Number" />
        </label>
        <button type="submit">Change number</button>
      </form>

      <button type="button" onClick={randomNumber}>
        Random number
      </button>
    </div>
  );
};

const Parent = () => {
  const [favoriteNumber, setFavoriteNumber] = useState(42);

  const limitedNumberChanger = (newNumber) => {
    if (newNumber < 0 || newNumber > 100)
      return alert("Number should be within 0 and 100.");

    setFavoriteNumber(newNumber);
  };

  return (
    <div className="col wide-gap">
      <h2>My favourite number is: {favoriteNumber}</h2>

      <Child changeNumber={setFavoriteNumber} />

      <Child changeNumber={limitedNumberChanger} />
    </div>
  );
};

export const Communication = () => {
  return (
    <main className="col wide-gap">
      <h1>Communication</h1>

      <div className="col border" id="Sharing state">
        <SharedCounters startingValue={42} />
      </div>

      <div className="col border" id="Elevating state up">
        <Parent />
      </div>
    </main>
  );
};
