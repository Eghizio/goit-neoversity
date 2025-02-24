import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { Timer } from "./components/Timer";
import { Navigation } from "./components/Navigation";
import { ProductsList } from "./components/ProductsList";
import { ProductCard } from "./components/ProductCard";
import products from "./data/products.json";
import css from "./UrlParams.module.css";

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

const Capitalize = ({ text, ...props }) => (
  <span className="blue" style={{ textTransform: "capitalize" }} {...props}>
    {text}
  </span>
);

const ProductCategory = () => {
  const { category } = useParams();

  const productsOfCategory = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <main className="col">
      <h2>
        <Capitalize text={`${category} Products`} />
      </h2>

      <ProductsList products={productsOfCategory} />
    </main>
  );
};

const ProductDetails = () => {
  const { productId, category } = useParams();

  const product = products.find(
    (p) => p.id.toString().toLowerCase() === productId.toLowerCase()
  );

  if (product === undefined) {
    const categoryPageLink = `/products/${category}`;

    return (
      <main className="col">
        <h2>
          Product <Capitalize text={`#${productId}`} /> not found
        </h2>
        <Link to={categoryPageLink}>
          Go back to <Capitalize text={`<${category}>`} /> category page
        </Link>
      </main>
    );
  }

  return (
    <main className="col">
      <h2>
        <Capitalize text={`${category} Product #${productId}`} />
      </h2>

      <ProductCard product={product} />
    </main>
  );
};

// https://remix.run/_docs/routing
export const UrlParams = () => (
  <div className={css.app}>
    <h1>URL Params</h1>
    <Timer />

    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navigation navigationLinks={links} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route
          path="/products/:category/:productId"
          element={<ProductDetails />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);
