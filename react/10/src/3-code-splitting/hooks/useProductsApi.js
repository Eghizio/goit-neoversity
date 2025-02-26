import { useMemo } from "react";
import { ProductsApi } from "../api/products";

export const useProductsApi = () => useMemo(() => new ProductsApi(), []);
