import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductCategory } from "./pages/ProductCategory";
import { ProductDetails } from "./pages/ProductDetails";
import { NotFound } from "./pages/NotFound";

import { Timer } from "./components/Timer";
import { Navigation } from "./components/Navigation";

import css from "./UsingOutlet.module.css";

const links = [
  "/",
  "/blog",
  "/about",
  "/products",
  "/products/accessories",
  "/products/accessories/1001",
  "/products/apparel",
  "/products/apparel/1002",
  "/products/electronics/non-existing-id",
  `/products/electronics/1005/dupa`,
  "/dupa",
];

const Blog = () => (
  <article>
    <h3>Blog</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
      veritatis, omnis eum eaque unde provident ducimus exercitationem quis,
      quibusdam maxime dolores fugit architecto in incidunt temporibus
      repudiandae mollitia iure tempora. Nulla, deserunt perferendis? Autem
      asperiores recusandae quasi perferendis veniam accusantium! Nostrum aut ad
      inventore in quisquam eos voluptatibus ut recusandae obcaecati saepe?
      Impedit quae explicabo necessitatibus cupiditate placeat beatae id?
    </p>
  </article>
);

const About = () => (
  <article>
    <h3>About</h3>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam
      quas, iusto nesciunt distinctio odit, aspernatur necessitatibus aut
      tempore officia hic ad mollitia dolores nostrum, error laborum ex culpa
      placeat?
    </p>
  </article>
);

/* No Navigation in `/products` - Any ideas how to fix it? ;) */
const Layout = () => (
  <main>
    <h2>Layout</h2>
    <Navigation navigationLinks={links} />
    <Timer />

    <Outlet />
  </main>
);

// https://reactrouter.com/en/main/components/outlet
// https://remix.run/_docs/routing
export const UsingOutlet = () => (
  <div className={css.app}>
    <h1>Using Outlet</h1>
    <Timer />

    {/* <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/products">
          <Route path="" element={<Products />} />
          <Route path=":category">
            <Route path="" element={<ProductCategory />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter> */}

    {/* <RouterSeperateLayouts /> */}
    <RouterSharedLayout />
  </div>
);

const RouterSeperateLayouts = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* <Route path="/products"> */}
      {/* Products have their own Layout. */}
      <Route path="/products" element={<Layout />}>
        <Route path="" element={<Products />} />
        <Route path=":category">
          <Route path="" element={<ProductCategory />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const RouterSharedLayout = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />

        {/* Products inside `/` */}
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
);
