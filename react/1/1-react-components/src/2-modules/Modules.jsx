// import Default from "./Default";
import Dupa from "./Default";

import {
  Named,
  AnotherComponent as First,
  SomeComponent as Second,
} from "./Named";

export const Modules = () => (
  <>
    {/* <Default /> */}
    <Dupa />

    <Named />
    <First />
    <Second />
  </>
);
