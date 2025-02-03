import { useState } from "react";

const style = {
  orange: { backgroundColor: "orange" },
  green: { backgroundColor: "lime" },
  red: { backgroundColor: "red" },
};

const Clicker = () => {
  let clicks = 0;

  const onClick = () => {
    clicks = clicks + 1;

    console.log(clicks);
  };

  console.log({ clicks });

  return (
    <button style={style.orange} onClick={onClick}>
      Clicked {clicks} times
    </button>
  );
};

const StatefullClicker = () => {
  // let [clicks, setClicks] = useState(0);
  const [clicks, setClicks] = useState(0);

  const onClick = () => {
    // clicks = clicks + 1; /* Illegal */
    // console.log(clicks);

    setClicks(clicks + 1);
    console.log(clicks);
    setClicks(clicks + 1);
  };

  console.log("Rerender: ", clicks);

  const increment = () => {
    setClicks((previousState) => previousState + 1);
    setClicks((previousState) => previousState + 1);
  };

  // const clickHandler = onClick;
  const clickHandler = increment;

  return (
    <button style={style.green} onClick={clickHandler}>
      Clicked {clicks} times
    </button>
  );
};

const MulticolorCounter = ({ startingColor = "orange" }) => {
  /* Multiple states */
  const [color, setColor] = useState(startingColor);
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter((prev) => prev + 1);

  const toggleColor = (checked) =>
    setColor((prev) => (prev === "orange" ? "green" : "orange"));

  return (
    <div className="col">
      <button style={style[color]} onClick={increment}>
        Counter value is {counter}
      </button>

      <label>
        <input
          type="checkbox"
          onChange={(e) => toggleColor(e.target.checked)}
        />
        Color: {color}
      </label>
    </div>
  );
};

const Counter = ({ startingValue, step }) => {
  const [count, setCount] = useState(startingValue);

  const increment = () => setCount((p) => p + step);
  const decrement = () => setCount((p) => p - step);

  return (
    <div className="row">
      <button style={style.red} type="button" onClick={decrement}>
        -
      </button>

      <span>{count}</span>

      <button style={style.green} type="button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export const State = () => {
  return (
    <main className="col wide-gap">
      <h1>State</h1>

      <div className="col border">
        <Clicker />
      </div>

      <div className="col border" id="Independent state">
        <StatefullClicker />
        <StatefullClicker />
      </div>

      <div className="col border" id="Multiple independent states">
        <MulticolorCounter startingColor="orange" />
        <MulticolorCounter startingColor="green" />
      </div>

      <div className="col border" id="Configurable Counters">
        <Counter startingValue={42} step={7} />
        <Counter startingValue={69} step={-3} />
      </div>
    </main>
  );
};
