// interpolation & array join
import { rndBool } from "../utils";
import "./styles.css";

const cs = (shouldApply, className) => (shouldApply ? " " + className : "");

const classNames = (classes) => classes.toString();
// const classNames = (classes) => classes.toString().replaceAll(",", " ");
// const classNames = (classes) => classes.join(" ");
// const classNames = (classes) => classes.flatMap((c) => (c ? c : [])).join(" ");
// const classNames = (classes) => classes.filter(Boolean).join(" ");

export const ClassComposition = () => {
  const isDanger = rndBool();

  const titleClass = `title${isDanger && " danger"}`;
  // const titleClass = `title${isDanger ? " danger" : ""}`;
  // const titleClass = `title${cs(isDanger, "danger")}`;
  // const titleClass = classNames(["title", isDanger && "danger"]);

  return (
    <main className="card">
      <h1 className={titleClass}>Class Composition {isDanger && "(Danger)"}</h1>
      <p>{titleClass}</p>

      <p className={classNames([isDanger && "danger"])}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
        molestias saepe ut fugiat nisi quasi ab ipsa molestiae iste! Doloremque
        earum voluptates recusandae tenetur beatae possimus, provident assumenda
        iure sequi.
      </p>
    </main>
  );
};
