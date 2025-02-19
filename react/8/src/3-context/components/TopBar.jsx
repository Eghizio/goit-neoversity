import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Context";
import css from "./Styles.module.css";

export const Logo = ({ onClick }) => (
  <h1 className={css.logo} onClick={onClick}>
    Shop
  </h1>
);

const SearchBar = () => {
  const { searchFilter, updateSearchFilter } = useCart();

  return (
    <input
      className={css.search}
      type="text"
      name="search"
      placeholder="Search products..."
      value={searchFilter}
      onChange={(e) => updateSearchFilter(e.target.value)}
    />
  );
};

export const CartButton = ({ onClick }) => {
  const { productsInCart } = useCart();

  const cartIndicator = productsInCart < 100 ? productsInCart : "+99";

  return (
    <button className={css.cartBtn} type="button" onClick={onClick}>
      <FaShoppingCart size={24} />

      {cartIndicator > 0 ? (
        <span className={css.itemsAmount}>{cartIndicator}</span>
      ) : null}
    </button>
  );
};

export const TopBar = ({ setPage }) => {
  const goToShop = () => setPage("shop");

  const goToCheckout = () => setPage("checkout");

  return (
    <header className={css.bar}>
      <Logo onClick={goToShop} />
      <SearchBar />
      <CartButton onClick={goToCheckout} />
    </header>
  );
};
