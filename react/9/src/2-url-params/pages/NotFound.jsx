import { Link } from "react-router-dom";

export const NotFound = () => {
  console.log("%cPage not found!", "color:crimson; font-size: xx-large;");

  return (
    <main className="col wide-gaps">
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </main>
  );
};
