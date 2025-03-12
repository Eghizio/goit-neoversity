import { Tabs } from "./Tabs/Tabs";
import { SelectorNaming } from "./0-selector-naming/SelectorNaming";
import { CombinedSelectors } from "./1-combined-selectors/CombinedSelectors";
import { CreateSelector } from "./2-create-selector/CreateSelector";

export const App = () => (
  <Tabs>
    <SelectorNaming />
    <CombinedSelectors />
    <CreateSelector />
  </Tabs>
);

// Zaraz zaczynamy ;)
