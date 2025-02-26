import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";

import { UserProvider, useUser } from "./context/UserContext";
import { PrivateRoute } from "./routing/PrivateRoute";

import { Products } from "./pages/Products";
import { ProductCategory } from "./pages/ProductCategory";
import { ProductDetails } from "./pages/ProductDetails";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";

import { Navigation } from "./components/Navigation";
import { TopBar } from "./components/TopBar";
import { ProductSummary } from "./components/ProductSummary";
import { Bar } from "./components/Bar";
import { SearchBar } from "./components/SearchBar";

import { useProductsApi } from "./hooks/useProductsApi";

import css from "./SearchParams.module.css";

const links = [
  "/",
  "/products",
  "/products?discount=abc",
  "/products/accessories",
  "/products/accessories/1001",
  "/products/apparel",
  "/products/apparel/1002",
  "/products/electronics/non-existing-id",
  `/products/electronics/1005/dupa`,
  "/dupa",
  "/login",
  "/profile",
  "/checkout",
  "/checkout?productId=1001",
  "/thank-you",
  "/thank-you?productId=1001",
];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const api = useProductsApi();
  const navigate = useNavigate();

  const productId = searchParams.get("productId");
  const product = api.getProductById(productId);

  if (!product) {
    const goBack = () => navigate(-1);

    return (
      <article className="col">
        <p className="col red">No product found with id "{productId}".</p>

        <span className="hoverable blue underline" onClick={goBack}>
          Go back
        </span>
      </article>
    );
  }

  const onPaymentConfirmation = () => {
    const query = new URLSearchParams({ productId: product.id }).toString();
    navigate(`/thank-you?${query}`);
  };

  return (
    <main>
      <h2
        style={{
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "antiquewhite",
        }}
      >
        Checkout
      </h2>

      <section className="col">
        <h3 className="orange">Confirm purchase of product #{product.id}</h3>
        <ProductSummary product={product} onPurchase={onPaymentConfirmation} />
      </section>
    </main>
  );
};

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const api = useProductsApi();
  const { user } = useUser();

  if (user === null) return <Navigate to="/login" replace />;

  const productId = searchParams.get("productId");
  const product = api.getProductById(productId);

  if (!product) return <Navigate to="/products" replace />;

  const orderId = crypto.randomUUID();

  return (
    <main className="col wide-gap">
      <section>
        <h2>Thank you for purchasing product #{product.id}</h2>
      </section>

      <Bar className="col">
        <h3 className="blue">{product.name}</h3>
        <img src={product.image} alt={product.name} />
      </Bar>

      <section>
        <Link className="hoverable blue" to="/products">
          Browse more products
        </Link>
      </section>

      <Bar className="col green">
        <p>We will send an email with further details to your address:</p>
        <p className="underline bold">{user.email}</p>
      </Bar>

      <section>
        Order identifier: <span className="underline bold">{orderId}</span>
      </section>
    </main>
  );
};

const Layout = () => (
  <main>
    <h2>Layout</h2>
    <TopBar />
    <Navigation navigationLinks={links} />

    <Outlet />
  </main>
);

const ProductsLayout = () => (
  <>
    <SearchBar />
    <Outlet />
  </>
);

export const SearchParams = () => (
  <div className={css.app}>
    <h1>Search Parameters</h1>

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
