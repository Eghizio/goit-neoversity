import { createContext, useContext, useState } from "react";
import { Shop } from "./components/Shop";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("Cart Context must be used within Provider.");
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const addProduct = (productId) => {
    setCart((cart) => [...cart, productId]);
  };

  const removeProduct = (productId) => {
    setCart((cart) => cart.filter((id) => id !== productId));
  };

  const checkout = () => {
    const productIds = [...cart];
    setCart([]);
    return productIds;
  };

  const productsInCart = cart.length;

  const value = {
    cart,
    addProduct,
    removeProduct,
    productsInCart,
    checkout,
    searchFilter,
    updateSearchFilter: setSearchFilter,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const Context = () => {
  return (
    <main>
      <h1>React Context API</h1>

      <CartProvider>
        <Shop />
      </CartProvider>

      <footer className="col">
        <span>Shop @ 2024</span>
      </footer>
    </main>
  );
};
