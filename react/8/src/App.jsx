import { Tabs } from "./Tabs/Tabs";
import { Memoization } from "./0-memoization/Memoization";
import { Ref } from "./1-ref/Ref";
import { CustomHooks } from "./2-custom-hooks/CustomHooks";
import { Context } from "./3-context/Context";

export const App = () => (
  <Tabs>
    <Memoization />
    <Ref />
    <CustomHooks />
    <Context />
  </Tabs>
);
