import { Link, useLocation } from "react-router-dom";

export const GoBack = () => {
  const location = useLocation();

  const from = location?.state?.from;

  if (from === undefined) return null;

  return (
    <Link to={from} className="hoverable blue">
      &lt; Go back
    </Link>
  );
};
