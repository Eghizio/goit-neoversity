import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { Timer } from "./components/Timer";

const absoluteLinks = [
  "http://localhost:5173/",
  "http://localhost:5173/products",
  "http://localhost:5173/dupa",
];

const relativeLinks = ["/", "/products", "/dupa"];

const ReloadingNavigation = ({ navigationLinks = absoluteLinks }) => (
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
    {/* <ReloadingNavigation navigationLinks={relativeLinks} /> */}
    {/* <PersistentNavigation navigationLinks={relativeLinks} /> */}

    <Timer />

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <PersistentNavigation navigationLinks={relativeLinks} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);
