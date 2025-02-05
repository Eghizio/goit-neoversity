import { Tabs } from "./Tabs/Tabs";
import { Effects } from "./0-effects/Effects";
import { ComponentLifecycle } from "./1-component-lifecycle/ComponentLifecycle";
import { CustomHooks } from "./2-custom-hooks/CustomHooks";
import { Persistency } from "./3-persistency/Persistency";

export const App = () => (
  <Tabs>
    <Effects />
    <ComponentLifecycle />
    <CustomHooks />
    <Persistency />
  </Tabs>
);
