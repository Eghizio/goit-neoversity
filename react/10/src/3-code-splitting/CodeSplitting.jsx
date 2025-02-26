import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { PrivateRoute } from "./routing/PrivateRoute";

import { sleep } from "./api/utils";

/* Comment pages out. */
// import { Products } from "./pages/Products";
// import { ProductCategory } from "./pages/ProductCategory";
// import { ProductDetails } from "./pages/ProductDetails";
// import { Login } from "./pages/Login";
// import { Profile } from "./pages/Profile";
// import { Checkout } from "./pages/Checkout";
// import { ThankYou } from "./pages/ThankYou";
// import { NotFound } from "./pages/NotFound";

/* Lazy import - default import */
/* const ComponentToLazilyLoad = lazy(() => import("./path/to/Component.jsx")); */
// const ComponentToLazilyLoad = lazy(() => import("./path/to/Component.jsx"));
/* Lazy import - named import */
/* const ComponentToLazilyLoad = lazy(() => import("./path/to/Component.jsx").then((module) => ({ default: module["Component"] }))); */
// const ComponentToLazilyLoad = lazy(() =>
//   import("./path/to/Component.jsx").then((module) => ({
//     default: module["Component"],
//   }))
// );

// // /* import paths should be preferably static */
// // /* https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations */

const lazyPage = (name) =>
  lazy(() =>
    sleep(3_000).then(() =>
      import(`./pages/${name}.jsx`).then((module) => ({
        default: module[name],
      }))
    )
  );

const Products = lazyPage("Products");
const ProductCategory = lazyPage("ProductCategory");
const ProductDetails = lazyPage("ProductDetails");
const Login = lazyPage("Login");
const Profile = lazyPage("Profile");
const Checkout = lazyPage("Checkout");
const ThankYou = lazyPage("ThankYou");
const NotFound = lazyPage("NotFound");

import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { GoBack } from "./components/GoBack";
import { Spinner } from "./components/Spinner";

import { links } from "./routing/links";

import css from "./CodeSplitting.module.css";

/* There is an issue that the Page gets reimported lazily every time it gets rerendered. */
const Page = ({ name, delay = 3_000, fallback, ...props }) => {
  // Could possibly work better with some Memo.
  const Component = lazy(() =>
    sleep(delay).then(() =>
      import(`./pages/${name}.jsx`).then((module) => ({
        default: module[name],
      }))
    )
  );

  return (
    <Suspense fallback={fallback ?? <Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};

const LazyLoadingAndSuspense = () => (
  <ul>
    <li className="bold">
      Requires commenting out remaining Tabs children & their imports to notice
      the effect.
    </li>
    <li>{`Lazily loaded pages.`}</li>
    <li>{`Lazily loaded <ProductSummary /> in <Checkout /> & <ProductDetails /> page.`}</li>
    <li>{`React <Suspense /> with <Spinner /> as fallback.`}</li>
    <li>
      Downside of using suspense in the SPA (Single Page Application) - turn of
      the server and try to navigate
    </li>
  </ul>
);

const Layout = () => (
  <main>
    <h2>Layout</h2>
    <Header navigationLinks={links} />
    <LazyLoadingAndSuspense />

    <Outlet />
  </main>
);

const ProductsLayout = () => (
  <>
    <SearchBar />
    <Outlet />

    <GoBack />
  </>
);

const SuspensedApplication = () => (
  <Suspense fallback={<Spinner />}>
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
  </Suspense>
);

const SuspensedPages = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <UserProvider>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/products" element={<ProductsLayout />}>
            <Route
              path=""
              element={
                <Suspense fallback={<Spinner />}>
                  <Products />
                </Suspense>
              }
            />

            <Route path=":category">
              <Route
                path=""
                element={
                  <Suspense fallback={<Spinner />}>
                    <ProductCategory />
                  </Suspense>
                }
              />
              <Route
                path=":productId"
                element={
                  <Suspense fallback={<Spinner />}>
                    <ProductDetails />
                  </Suspense>
                }
              />
            </Route>
          </Route>

          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login">
                <Suspense fallback={<Spinner />}>
                  <Profile />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute redirectTo="/login">
                <Suspense fallback={<Spinner />}>
                  <Checkout />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/thank-you"
          element={
            <Suspense fallback={<Spinner />}>
              <ThankYou />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);

const SuspensedPagesWithWrapper = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <UserProvider>
      {/* <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/products" element={<ProductsLayout />}>
            <Route path="" element={<Page name="Products" />} />

            <Route path=":category">
              <Route path="" element={<Page name="ProductCategory" />} />
              <Route
                path=":productId"
                element={<Page name="ProductDetails" />}
              />
            </Route>
          </Route>

          <Route path="/login" element={<Page name="Login" />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login">
                <Page name="Profile" />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute redirectTo="/login">
                <Page name="Checkout" />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/thank-you" element={<Page name="ThankYou" />} />

        <Route path="*" element={<Page name="NotFound" />} />
      </Routes> */}
    </UserProvider>
  </BrowserRouter>
);

export const CodeSplitting = () => (
  <div className={css.app}>
    <h1>Code Splitting</h1>

    {/* <SuspensedApplication /> */}

    <SuspensedPages />

    {/* <SuspensedPagesWithWrapper /> */}
  </div>
);
