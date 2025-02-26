import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  Navigate,
} from "react-router-dom";

import { UserProvider, useUser } from "./context/UserContext";

import { Products } from "./pages/Products";
import { ProductCategory } from "./pages/ProductCategory";
import { ProductDetails } from "./pages/ProductDetails";
import { NotFound } from "./pages/NotFound";

import { Navigation } from "./components/Navigation";
import { Input } from "./components/Input";
import { Spinner } from "./components/Spinner";

import css from "./Navigating.module.css";

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
  "/login",
  "/profile",
];

const Login = () => {
  const { user, login } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  /* Still can enter /login via URL. Need to persist state. */
  if (user !== null) return <Navigate to="/profile" replace />;

  const loginUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target.elements["email"].value.trim();
    const password = event.target.elements["password"].value;

    console.log({ email, password });

    try {
      await login(email, password);
      /* navigate to <Profile />, already handled in <UserProvider /> and above */
    } catch (error) {
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="col">
      <h2>Login</h2>

      <form onSubmit={loginUser} autoComplete="off">
        <Input type="email" name="email" label="Email" required />
        <Input type="password" name="password" label="Password" required />

        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>

      {isLoading ? <Spinner /> : null}
    </main>
  );
};

const TopBar = () => {
  const { user, logout } = useUser();

  return (
    <header>
      {user ? (
        <div className="row">
          <p className="green">Logged in as "{user.name}"</p>

          <button className="red" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="row">
          <p className="red">Not logged in.</p>

          <Link className="blue" to="/login">
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

/* Could be also a High Order Function/Component */
const PrivateRoute = ({ children, redirectTo }) => {
  const { user } = useUser();

  if (user === null) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
};

const Profile = () => {
  const { user } = useUser();

  return (
    <main>
      <h2>Profile</h2>
      <p className="red">Only logged in users allowed!</p>
      <p className="blue">
        Good thing that you are already logged in{" "}
        <span style={{ textDecoration: "underline" }}>{user.name}</span>
      </p>
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

export const Navigating = () => (
  <div className={css.app}>
    <h1>Navigating & Redirecting</h1>

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route path="/products">
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
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </div>
);
