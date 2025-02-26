import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { PrivateRoute } from "./routing/PrivateRoute";

import { Products } from "./pages/Products";
import { ProductCategory } from "./pages/ProductCategory";
import { ProductDetails } from "./pages/ProductDetails";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import { ThankYou } from "./pages/ThankYou";
import { NotFound } from "./pages/NotFound";

import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { GoBack } from "./components/GoBack";

import { links } from "./routing/links";

import css from "./Location.module.css";

const Layout = () => (
  <main>
    <h2>Layout</h2>
    <Header navigationLinks={links} />
    {/* <Breadcrumbs /> in Header */}

    <Outlet />
  </main>
);

const ProductsLayout = () => (
  <>
    <SearchBar />
    <Outlet />

    <GoBack />
    {/* <ProductCard state /> */}
  </>
);

export const Location = () => (
  <div className={css.app}>
    <h1>Location</h1>

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route path="/products" element={<ProductsLayout />}>
              <Route path="" element={<Products />} />

              <Route path=":category">
                <Route path="" element={<ProductCategory />} />
                <Route path=":productId" element={<ProductDetails />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/login">
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute redirectTo="/login">
                  <Checkout />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="/thank-you" element={<ThankYou />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </div>
);
