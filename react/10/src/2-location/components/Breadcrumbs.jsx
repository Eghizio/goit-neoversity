import { useLocation, NavLink } from "react-router-dom";

const css = {
  list: {
    margin: "0",
    padding: "0",
    listStyleType: "none",
    display: "flex",
    gap: "6px",
  },
  crumb: {
    textTransform: "capitalize",
  },
};

const CrumbLink = ({ to, children }) => (
  <NavLink
    to={to}
    style={css.crumb}
    end
    className={({ isActive }) => (isActive ? "hoverable blue" : "hoverable")}
  >
    {children}
  </NavLink>
);

export const Breadcrumbs = () => {
  const location = useLocation();

  console.log({ location });

  const crumbs = location.pathname
    .slice(1)
    .split("/")
    .filter(Boolean)
    .map((crumb, i, crumbs) => ({
      crumb,
      path: "/" + crumbs.slice(0, i + 1).join("/"),
    }));

  console.log({ crumbs });

  return (
    <nav>
      <ul style={css.list}>
        <li>
          <CrumbLink to="/">Home</CrumbLink>
        </li>

        {crumbs.map(({ crumb, path }) => (
          <li key={path}>
            &gt; <CrumbLink to={path}>{crumb}</CrumbLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
