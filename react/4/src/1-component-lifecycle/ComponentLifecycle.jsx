/* Mounting, Unmounting, ReRender */
import { useEffect, useState } from "react";

const If = ({ condition, children }) => (condition ? children : null);

// Props change = rerender;
const Component = ({ label }) => {
  // State change = rerender;
  const [favouriteNumber, setNumber] = useState(42);

  console.log("RENDERING"); // Or rerendering.

  const changeNumber = () => setNumber(Math.round(Math.random() * 1_000));

  useEffect(() => {
    console.log("ON MOUNT"); // Component created.
    return () => console.log("ON UNMOUNT"); // Component destroyed.
  }, []);

  useEffect(() => {
    console.log("LABEL CHANGED"); // Won't run on any rerender. Only when label changes.
  }, [label]);

  return (
    <div className="col border">
      <h2>{label}</h2>

      <h3>Favourite number: {favouriteNumber}</h3>

      <button onClick={changeNumber}>Change number</button>
    </div>
  );
};

export const ComponentLifecycle = () => {
  const [isRendered, setIsRendered] = useState(true);
  const [label, setLabel] = useState("Hello there"); // Prop

  const toggleRendering = () => setIsRendered((isRendering) => !isRendering);

  return (
    <main className="col wide-gap">
      <h1>ComponentLifecycle</h1>

      <button onClick={toggleRendering}>
        Toggle rendering (Rendering: {isRendered.toString()})
      </button>

      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label"
      />

      <If condition={isRendered}>
        <Component label={label} />
      </If>
    </main>
  );
};
