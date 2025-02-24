import { NavLink } from "react-router-dom";

export const Navigation = ({ navigationLinks }) => (
  <details open>
    <summary className="hoverable">Navigation</summary>

    <nav>
      <ul>
        {navigationLinks.map((link) => (
          <li key={link}>
            <NavLink
              to={link}
              className={({ isActive }) =>
                isActive ? "hoverable green" : "hoverable"
              }
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </details>
);
