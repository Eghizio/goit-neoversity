import { useSearchParams, useNavigate } from "react-router-dom";
import { ProductSummary } from "../components/ProductSummary";
import { useProductsApi } from "../hooks/useProductsApi";

export const Checkout = () => {
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
