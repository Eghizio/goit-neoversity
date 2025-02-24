import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { Timer } from "./components/Timer";

const fullLinks = [
  "http://localhost:5173/",
  "http://localhost:5173/products",
  "http://localhost:5173/dupa",
];

const links = ["/", "/products", "/dupa"];

const ReloadingNavigation = ({ navigationLinks = fullLinks }) => (
  <nav>
    <ul>
      {navigationLinks.map((link) => (
        <li key={link}>
          <a href={link}>{link}</a>
        </li>
      ))}
    </ul>
  </nav>
);

// https://reactrouter.com/en/main/components/nav-link
const PersistentNavigation = ({ navigationLinks }) => (
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
);

export const Links = () => (
  <>
    <h1>Links</h1>
    {/* <ReloadingNavigation navigationLinks={links} /> */}

    <Timer />

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <PersistentNavigation navigationLinks={links} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);
