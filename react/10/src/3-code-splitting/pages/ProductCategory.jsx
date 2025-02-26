import { useParams } from "react-router-dom";
import { Capitalize } from "../components/Capitalize";
import { ProductsList } from "../components/ProductsList";
import { useProductsApi } from "../hooks/useProductsApi";

export const ProductCategory = () => {
  const { category } = useParams();
  const api = useProductsApi();

  const productsOfCategory = api.getProducts(category);

  return (
    <main className="col">
      <h2>
        <Capitalize text={`${category} Products`} />
      </h2>

      <ProductsList products={productsOfCategory} />
    </main>
  );
};
