const css = {
  summary: {
    maxWidth: "700px",
    padding: "1rem",
    fontFamily: `"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif`,
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
    backgroundColor: "white",
    boxShadow: "1px 1px 5px 5px lightgray",
  },
  img: {
    justifySelf: "center",
  },
  info: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  name: {
    margin: "0",
  },
  btn: {
    padding: "0.5rem",
    border: "none",
    fontWeight: "bold",
  },
  description: {
    whiteSpace: "break-spaces",
  },
};

export const ProductSummary = ({ product, onPurchase }) => (
  <article style={css.summary}>
    <img style={css.img} src={product.image} alt={product.name} />

    <div style={css.info}>
      <h3 className="blue" style={css.name}>
        {product.name} ({product.category})
      </h3>

      <button className="hoverable" style={css.btn} onClick={onPurchase}>
        Buy for $ {product.price}
      </button>

      <p style={css.description}>{product.description}</p>
    </div>
  </article>
);
