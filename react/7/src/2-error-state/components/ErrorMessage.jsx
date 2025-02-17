const color = {
  primary: "#ff6600",
  secondary: "#f6f6ef",
  text: "#828282",
};

const css = {
  article: {
    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
    backgroundColor: color.secondary,
    color: color.text,
    padding: "1rem",
  },
  highlight: {
    cursor: "pointer",
    color: color.primary,
    textDecoration: "underline",
  },
};

export const ErrorMessage = ({ onRetry }) => (
  <article style={css.article}>
    <h4>There was an error.</h4>
    <p>The articles failed to load for some reason.</p>
    <p style={css.highlight} onClick={onRetry}>
      Please try to load articles again later.
    </p>
  </article>
);
