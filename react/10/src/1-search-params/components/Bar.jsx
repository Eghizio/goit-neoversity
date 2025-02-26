const css = {
  padding: "2rem",
  backgroundColor: "white",
  boxShadow: "1px 1px 5px 5px lightgray",
};

export const Bar = ({ children, style, ...props }) => (
  <section style={{ ...css, ...style }} {...props}>
    {children}
  </section>
);
