import { ProductsList } from "../components/ProductsList";
import { useProductsApi } from "../hooks/useProductsApi";

export const Products = () => {
  console.log("%cRendering Products Page...", "color:magenta");

  const products = useProductsApi().getProducts();

  return (
    <main className="col wide-gaps">
      <h2>All Products</h2>

      <ProductsList products={products} />
    </main>
  );
};
