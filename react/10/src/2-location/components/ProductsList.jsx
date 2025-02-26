import { ProductCard } from "./ProductCard";
import { useSearch } from "../hooks/useSearch";

const css = {
  list: {
    width: "100%",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
  },
};

export const ProductsList = ({ products }) => {
  const { searchQuery } = useSearch();

  const displayedProducts = products.filter(
    ({ id, name, price, description, category }) => {
      return [id, name, price, description, category].some((criteria) => {
        return criteria
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
    }
  );

  return (
    <ul style={css.list}>
      {displayedProducts.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
