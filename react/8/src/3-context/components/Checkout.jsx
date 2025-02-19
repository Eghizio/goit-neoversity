import { useCart } from "../Context";
import css from "./Styles.module.css";
import products from "../data/products.json";

const toProducts = (productIds) =>
  productIds.flatMap((id) => products.find((p) => p.id === id) ?? []);

const toSummary = ({ id, name, price }) => ({
  id,
  name,
  price,
  amount: 1,
  sum: price,
});

const reduceSummary = (products) =>
  Object.values(
    products.reduce((acc, product) => {
      const summary = toSummary(product);
      const s = acc[summary.id] ?? { amount: 0, sum: 0 };
      acc[summary.id] = {
        ...summary,
        amount: summary.amount + s.amount,
        sum: summary.sum + s.sum,
      };
      return acc;
    }, {})
  );

const CheckoutSummary = ({ products }) => {
  const summary = reduceSummary(products);
  const total = summary.reduce((acc, product) => product.sum + acc, 0);

  return (
    <table className={css.checkoutTable}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {summary.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.amount.toFixed(0)}</td>
            <td>{product.price.toFixed(2)}</td>
            <td className={css.sum}>{product.sum.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2} />
          <th>Total</th>
          <td className={`${css.bold} ${css.sum}`}>$ {total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export const Checkout = () => {
  const { cart, checkout } = useCart();

  const cartProducts = toProducts(cart);

  return (
    <section className={css.checkout}>
      <CheckoutSummary products={cartProducts} />

      <button className={css.checkoutBtn} type="button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};
