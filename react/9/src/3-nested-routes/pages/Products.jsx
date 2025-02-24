import { ProductsList } from "../components/ProductsList";
import products from "../data/products.json";

export const Products = () => {
  console.log("%cRendering Products Page...", "color:magenta");

  return (
    <main className="col wide-gaps">
      <h2>All Products</h2>

      <ProductsList products={products} />
    </main>
  );
};
