import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Counters } from "./pages/Counters";
import { Products } from "./pages/Products";
import { ProductCategory } from "./pages/ProductCategory";
import { ProductDetails } from "./pages/ProductDetails";
import { NotFound } from "./pages/NotFound";

import { Timer } from "./components/Timer";
import { Navigation } from "./components/Navigation";

import css from "./VercelDeployment.module.css";

const links = [
  "/",
  "/blog",
  "/about",
  "/counters",
  "/products",
  "/products/accessories",
  "/products/accessories/1001",
  "/products/apparel",
  "/products/apparel/1002",
  "/products/electronics/non-existing-id",
  `/products/electronics/1005/dupa`,
  "/dupa",
];

const VercelJson = () => (
  <section>
    <h3>vercel.json</h3>

    <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
      🔗 Vercel website
    </a>

    <pre>
      {`
          {
            "rewrites":  [
              {"source": "/(.*)", "destination": "/"}
            ]
          }
    `}
    </pre>
  </section>
);

const Layout = () => (
  <main>
    <h2>Layout</h2>
    <Navigation navigationLinks={links} />

    <VercelJson />

    <Outlet />
  </main>
);

// https://vercel.com/
export const VercelDeployment = () => (
  <div className={css.app}>
    <h1>Vercel Deployment</h1>
    <Timer />

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="counters" element={<Counters />} />

          <Route path="/products">
            <Route path="" element={<Products />} />
            <Route path=":category">
              <Route path="" element={<ProductCategory />} />
              <Route path=":productId" element={<ProductDetails />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);
