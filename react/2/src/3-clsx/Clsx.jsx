import "./styles.css";
import clsx from "clsx"; /* https://www.npmjs.com/package/clsx */
import { rndBool } from "../utils";

const className = clsx(
  "title",
  undefined && "unused",
  true && "danger",
  rndBool() ? "active" : "inactive"
);

// const isActive = rndBool();

// const activeCls = isActive ? { active: true } : { inactive: true };
// const activeCls = { [isActive ? "active" : "inactive"]: true };

// const className = clsx({
//   // title: true,
//   unused: false,
//   danger: true,

//   // active: rndBool(),
//   // inactive: rndBool(),

//   // ...{ ...(isActive && { active: true }) },
//   // ...{ ...(!isActive && { inactive: true }) },

//   // ...activeCls,

//   active: isActive,
//   inactive: !isActive,
// });

export const Clsx = () => {
  return (
    <main>
      <h1 className={className}>Clsx</h1>
      <p>{className}</p>
    </main>
  );
};
