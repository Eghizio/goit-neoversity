import { useState } from "react";
import { TopBar } from "./TopBar";
import { ProductsList } from "./ProductsList";
import { Checkout } from "./Checkout";
import css from "./Styles.module.css";

import products from "../data/products.json";

export const Shop = () => {
  const [isCheckout, setIsCheckout] = useState(false);

  const setPage = (page) => setIsCheckout(page === "checkout");

  return (
    <div className={css.shop}>
      <TopBar setPage={setPage} />
      {isCheckout ? <Checkout /> : <ProductsList products={products} />}
    </div>
  );
};
