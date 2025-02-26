import { Link, useParams } from "react-router-dom";
import { Capitalize } from "../components/Capitalize";
import { ProductSummary } from "../components/ProductSummary";
import { useProductsApi } from "../hooks/useProductsApi";
import { useCheckout } from "../hooks/useCheckout";

export const ProductDetails = () => {
  const { productId, category } = useParams();
  const api = useProductsApi();
  const checkout = useCheckout();

  const product = api.getProductById(productId);

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

  const onPurchase = () => checkout(product.id);

  return (
    <main className="col">
      <h2>
        <Capitalize text={`${category} Product #${productId}`} />
      </h2>

      <ProductSummary product={product} onPurchase={onPurchase} />
    </main>
  );
};
