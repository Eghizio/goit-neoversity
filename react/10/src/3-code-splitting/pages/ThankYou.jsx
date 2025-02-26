import { Navigate, Link, useSearchParams } from "react-router-dom";
import { Bar } from "../components/Bar";
import { useUser } from "../context/UserContext";
import { useProductsApi } from "../hooks/useProductsApi";

export const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const api = useProductsApi();

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
