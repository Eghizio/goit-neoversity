import { useParams } from "react-router-dom";
import { Capitalize } from "../components/Capitalize";
import { ProductsList } from "../components/ProductsList";
import products from "../data/products.json";

export const ProductCategory = () => {
  const { category } = useParams();

  const productsOfCategory = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <main className="col">
      <h2>
        <Capitalize text={`${category} Products`} />
      </h2>

      <ProductsList products={productsOfCategory} />
    </main>
  );
};
