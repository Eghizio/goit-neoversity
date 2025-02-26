import { NavLink } from "react-router-dom";

export const Navigation = ({ navigationLinks }) => (
  <details open>
    <summary className="hoverable">Navigation</summary>

    <nav>
      <ul>
        {navigationLinks.map((link) => (
          <li key={link}>
            <NavLink
              end
              to={link}
              className={({ isActive }) => (isActive ? "green" : "")}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </details>
);
