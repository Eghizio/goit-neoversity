import { Product } from "./Product";
import { useCart } from "../Context";
import css from "./Styles.module.css";

const NoProducts = () => (
  <div>
    No products matching the criteria available at the moment. Please visit us
    later.
  </div>
);

export const ProductsList = ({ products }) => {
  const { searchFilter } = useCart();

  const searchResults = products.filter((p) =>
    [p.name, p.description, p.category].some((term) =>
      term.toLowerCase().includes(searchFilter.toLowerCase())
    )
  );

  return (
    <ul className={css.list}>
      {searchResults.length === 0 ? (
        <NoProducts />
      ) : (
        searchResults.map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))
      )}
    </ul>
  );
};
