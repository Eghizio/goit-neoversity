// Global styles, Cascade & isolation problems
import "./styles.css";

export const Globals = () => {
  const className = "title";
  // const className = "my-title";

  return (
    <main>
      <h1 className={className}>Globals</h1>
      <button className="btn">Default button</button>
    </main>
  );
};
