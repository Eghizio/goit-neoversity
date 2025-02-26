import { ProductCard } from "./ProductCard";

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
  return (
    <ul style={css.list}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
