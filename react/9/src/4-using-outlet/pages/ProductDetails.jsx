import { Link, useParams } from "react-router-dom";
import { Capitalize } from "../components/Capitalize";
import { ProductCard } from "../components/ProductCard";
import products from "../data/products.json";

export const ProductDetails = () => {
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
