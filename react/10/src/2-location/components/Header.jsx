import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "./Navigation";
import { TopBar } from "./TopBar";

const style = {
  padding: "0 1rem",
  display: "flex",
  justifyContent: "space-between",
  gap: "0.5rem",
};

export const Header = ({ navigationLinks }) => (
  <header style={style}>
    <div>
      <Breadcrumbs />
      <Navigation navigationLinks={navigationLinks} />
    </div>

    <TopBar />
  </header>
);
