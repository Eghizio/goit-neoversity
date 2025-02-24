const textStyle = {
  textTransform: "uppercase",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "large",
  fontFamily: `"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif`,
};

const boxStyle = { padding: "1rem", borderRadius: "5px" };

const css = {
  counter: {
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "antiquewhite",
  },
  row: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
  },
  count: {
    ...textStyle,
    ...boxStyle,
    flex: "1",
    backgroundColor: "lightgray",
  },
  btn: {
    ...textStyle,
    ...boxStyle,
    border: "none",
    color: "white",
  },
  success: {
    backgroundColor: "limegreen",
  },
  warning: { backgroundColor: "orange" },
  danger: { backgroundColor: "red", flex: "1" },
};

const Row = ({ children }) => <div style={css.row}>{children}</div>;

const Button = (props) => (
  <button
    className="hoverable"
    style={{ ...css.btn, ...props.style }}
    type="button"
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export const Counter = ({ count, increment, decrement, reset }) => (
  <article className="col" style={css.counter}>
    <Row>
      <span style={css.count}>{count}</span>
    </Row>

    <section className="col">
      <Row>
        <Button style={css.success} onClick={increment}>
          Increment
        </Button>
        <Button style={css.warning} onClick={decrement}>
          Decrement
        </Button>
      </Row>

      <Row>
        <Button style={css.danger} onClick={reset}>
          Reset
        </Button>
      </Row>
    </section>
  </article>
);
