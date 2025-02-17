import { HashLoader } from "react-spinners";

const SimpleLoader = () => <p className="orange">No articles yet!</p>;

const FancyLoader = () => (
  <HashLoader size={200} color="#ff6600" aria-label="Loader" />
);

export const Loader = SimpleLoader;
// export const Loader = FancyLoader;
