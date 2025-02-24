import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductCategory } from "./pages/ProductCategory";
import { ProductDetails } from "./pages/ProductDetails";
import { NotFound } from "./pages/NotFound";

import { Timer } from "./components/Timer";
import { Navigation } from "./components/Navigation";

import css from "./NestedRoutes.module.css";

const links = [
  "/",
  "/products",
  "/products/accessories",
  "/products/accessories/1001",
  "/products/apparel",
  "/products/apparel/1002",
  "/products/electronics/non-existing-id",
  `/products/electronics/1005/dupa`,
  "/dupa",
];

const FlatRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:category" element={<ProductCategory />} />
    <Route path="/products/:category/:productId" element={<ProductDetails />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const NestedRouting = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />

    <Route path="/products">
      <Route path="" element={<Products />} />
      <Route path=":category">
        <Route path="" element={<ProductCategory />} />
        <Route path=":productId" element={<ProductDetails />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

// https://reactrouter.com/en/main/start/overview#nested-routes
export const NestedRoutes = () => (
  <div className={css.app}>
    <h1>Nested Routes</h1>
    <Timer />

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navigation navigationLinks={links} />

      {/* <FlatRouting /> */}
      <NestedRouting />
    </BrowserRouter>
  </div>
);
