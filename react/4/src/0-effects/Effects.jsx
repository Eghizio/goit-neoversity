/* useEffect Hook, timeouts & intervals */
import { useEffect, useState } from "react";

const timeLeft = (date) => {
  const diff = date.getTime() - Date.now();
  return diff <= 0 ? 0 : diff;
};

const Human = ({ expirationDate }) => {
  const [remainingLifespan, setRemainingLifespan] = useState(
    timeLeft(expirationDate)
  );

  const isAlive = remainingLifespan > 0;

  console.log(remainingLifespan);

  useEffect(() => {
    console.log("Mounting and starting interval!");

    const interval = setInterval(() => {
      console.log({ remainingLifespan }); // Stale closure value.

      setRemainingLifespan(() => {
        const updatedLifespan = timeLeft(expirationDate);

        if (updatedLifespan <= 0) clearInterval(interval);

        return updatedLifespan;
      });

      console.log("Running interval", Date.now());
    }, 1_000);

    /* Cleanup function */
    return () => {
      console.log("Unmounting and cleaning up interval!");
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="border"
      style={{ borderColor: isAlive ? "green" : "crimson" }}
    >
      <p>
        I have <span>{remainingLifespan} ms</span> left.
      </p>
      <p>{isAlive ? "My time has come!" : "I'm alive!"}</p>
    </div>
  );
};

const Tracker = () => {
  useEffect(() => {
    const trackCursor = ({ clientX: x, clientY: y }) => console.log({ x, y });

    document.addEventListener("mousemove", trackCursor);

    return () => document.removeEventListener("mousemove", trackCursor);
  }, []);

  return null;
};

export const Effects = () => {
  const [isVisible, setVisibile] = useState(true);
  const [key, setKey] = useState(Math.random().toString());

  useEffect(() => {
    console.log("New key value:", { key }); // This will get logged only upon key change.
  }, [key]);

  const toggle = () => setVisibile((prev) => !prev);

  const resetHuman = () => setKey(Math.random().toString()); // Or revive ;)

  return (
    <main className="col wide-gap">
      <h1>Effects</h1>

      <div className="col wide-gap border">
        <button onClick={toggle}>Toggle visibility</button>
        <button onClick={resetHuman}>Reset human</button>

        {isVisible ? (
          <>
            <Human key={key} expirationDate={new Date(Date.now() + 15_000)} />
            {/* <Tracker /> */}
          </>
        ) : (
          <p>"Visibility & Tracking off."</p>
        )}
      </div>
    </main>
  );
};
