// exporting, variant components -> specific components
import clsx from "clsx";
import "./styles.css";

const css = {
  column: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-start",
  },
  danger: {
    backgroundColor: "crimson",
    color: "white",
  },
  info: {
    backgroundColor: "dodgerblue",
    color: "white",
  },
};

const Column = ({ children }) => <div style={css.column}>{children}</div>;

// const Button = (props) => (
//   <button className="btn" style={props.style}>
//     {props.children}
//   </button>
// );

// const Button = ({ children, variant }) => (
//   <button className="btn" style={css[variant]}>
//     {children}
//   </button>
// );

// const Button = ({ children, info, danger }) => {
//   const classNames = clsx({
//     btn: true,
//     info,
//     danger,
//   });

//   return <button className={classNames}>{children}</button>;
// };

// /* CSS variants */
// const Button = ({ children, className }) => (
//   <button className={clsx(["btn", className])}>{children}</button>
// );

// const DangerButton = ({ children }) => (
//   <Button className="danger">{children}</Button>
// );

/* JSS (CSS in JS) variants */
const Button = ({ children, variant }) => (
  <button className="btn" style={css[variant]}>
    {children}
  </button>
);

const DangerButton = ({ children }) => (
  <Button variant="danger">{children}</Button>
);

const InfoButton = ({ children }) => <Button variant="info">{children}</Button>;

/* Props spreading */
// const DangerButton = ({ children }) => (
//   <Button {...{ children, variant: "danger" }} />
// );

export const ReusingStyles = () => {
  return (
    <main>
      <h1>ReusingStyles</h1>

      <Column>
        <Column>
          <Button>Hello There</Button>

          {/* <Button style={css.danger}>Bye Bye</Button>
          <Button style={css.info}>Get more info</Button> */}
        </Column>

        <Column>
          {/* <Button variant="danger">Bye Bye</Button>
          <Button variant="info">Get more info</Button>
          <Button variant="unknown">???</Button> */}
        </Column>

        <Column>
          {/* <Button>0. Get more info</Button>

          <Button danger>1. Get more info</Button>
          <Button danger={false}>2. Get more info</Button>

          <Button info>3. Get more info</Button>

          <Button danger info>
            4. Get more info
          </Button>
          <Button info danger>
            5. Get more info
          </Button> */}
        </Column>

        <Column>
          {/* <Button>Bzzz Bzzz 🐝</Button>

          <DangerButton>Watch out for spiders! 🕷️</DangerButton>

          <InfoButton>Boars ahead! 🐗</InfoButton> */}
        </Column>
      </Column>
    </main>
  );
};
