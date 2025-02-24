import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Counter } from "./components/Counter";
import { Timer } from "./components/Timer";
import { useCounter } from "./useCounter";

const links = ["http://localhost:5173/", "http://localhost:5173/products"];

const Navigation = ({ navigationLinks = links }) => (
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

const Home = () => {
  const { count, increment, decrement, reset } = useCounter();

  console.log("%cRendering Home Page...", "color:cyan");

  return (
    <main className="col wide-gaps">
      <h2>Home</h2>
      <Counter
        count={count}
        increment={increment}
        decrement={decrement}
        reset={reset}
      />
    </main>
  );
};

const Products = () => {
  const counter = useCounter();

  console.log("%cRendering Products Page...", "color:magenta");

  return (
    <main className="col wide-gaps">
      <h2>Products</h2>
      <Counter {...counter} />
    </main>
  );
};

export const Routing = () => (
  <>
    <h1>Routing</h1>
    <Navigation />
    <Timer rainbow />

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>

    {/* <RouterProvider router={router} future={{ v7_startTransition: true }} /> */}
  </>
);

// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/products",
//       element: <Products />,
//     },
//   ],
//   {
//     /* react-router-dom verions 7 shennanigans */
//     future: {
//       v7_fetcherPersist: true,
//       v7_normalizeFormMethod: true,
//       v7_partialHydration: true,
//       v7_relativeSplatPath: true,
//       v7_skipActionErrorRevalidation: true,
//     },
//   }
// );
