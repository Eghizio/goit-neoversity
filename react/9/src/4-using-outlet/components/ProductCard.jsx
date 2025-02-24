import { Link } from "react-router-dom";

const css = {
  card: {
    padding: "4px",
    fontFamily: `"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif`,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    boxShadow: "1px 1px 5px 5px lightgray",
  },
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
  name: {
    margin: 0,
    whiteSpace: "break-spaces",
  },
  img: {
    width: "200px",
    height: "200px",
    aspectRatio: "1 / 1",
  },
  btn: {
    margin: "4px",
    padding: "0.5rem",
    border: "none",
    fontWeight: "bold",
  },
};

const Row = ({ children }) => <div style={css.row}>{children}</div>;

const CategoryLink = ({ category }) => {
  let emoji = "";

  switch (category.toLowerCase()) {
    case "accessories":
      emoji = "🧢";
      break;
    case "apparel":
      emoji = "👗";
      break;
    case "electronics":
      emoji = "💻";
      break;
    case "beauty":
      emoji = "💅";
      break;
    case "jewelry":
      emoji = "💍";
      break;
    case "sports":
      emoji = "⚽";
      break;
    case "home":
      emoji = "🏠";
      break;
    case "stationery":
      emoji = "✏️";
      break;
    case "outdoor":
      emoji = "🏕️";
      break;
  }

  return (
    <span style={css.row}>
      <Link to={`/products/${category}`}>{category}</Link>
      {emoji}
    </span>
  );
};

export const ProductCard = ({
  product: { id, name, image, price, description, category },
}) => {
  return (
    <article style={css.card}>
      <Row>
        <h4 style={css.name}>{name}</h4>
      </Row>

      <Row>
        <p>
          <CategoryLink category={category} />
        </p>
        <p>
          <Link to={`/products/${category}/${id}`}>Details</Link>
        </p>
      </Row>

      <img style={css.img} src={image} alt={name} />

      <button style={css.btn} className="hoverable">
        Buy for <span style={css.price}>$ {price}</span>
      </button>
    </article>
  );
};
