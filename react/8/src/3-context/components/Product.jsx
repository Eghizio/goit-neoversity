import css from "./Styles.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../Context";

export const Product = ({
  product: { id, name, avatar, price, description, category },
}) => {
  const { cart, addProduct } = useCart();

  const addToCart = () => addProduct(id);

  const isInCart = cart.includes(id);

  return (
    <article
      className={`${css.product}${isInCart ? ` ${css.inCart}` : ""}`}
      id={id}
    >
      <img className={css.productImg} src={avatar} alt={name} />

      <div className={css.productInfo}>
        <h3 className={css.productName}>{name}</h3>

        <div className={css.row}>
          <span className={css.category}>{category}</span>
        </div>

        <p className={css.description}>{description}</p>

        <button className={css.addToCartBtn} type="button" onClick={addToCart}>
          <span>$ {price}</span>
          <FaCartPlus size={24} />
        </button>
      </div>
    </article>
  );
};
