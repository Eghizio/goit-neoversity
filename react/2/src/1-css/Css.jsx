// using CSS classes
import { randomElement } from "../utils";
import "./styles.css";

const classVariants = ["danger", "info"];

export const Css = () => {
  const cls = randomElement(classVariants);

  return (
    <main>
      {/* <link rel="stylesheet" href="./src/1-css/styles.css" /> */}
      <h1 className="danger">
        CSS - <span className={cls}>{cls}</span>
      </h1>
      <p className="info">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio rem
        accusantium quis obcaecati, error facilis culpa tempore soluta ut eaque,
        animi enim expedita alias adipisci quia aspernatur fugit! Accusamus, a!
      </p>
      <p className={cls}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
        odit quis ipsam consequuntur et minima nostrum facere quo, molestias
        iste unde dolorum ab sit officia repudiandae, porro nihil praesentium
        hic.
      </p>
    </main>
  );
};
