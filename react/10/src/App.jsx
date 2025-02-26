import { Tabs } from "./Tabs/Tabs";
import { Navigating } from "./0-navigating/Navigating";
import { SearchParams } from "./1-search-params/SearchParams";
import { Location } from "./2-location/Location";
import { CodeSplitting } from "./3-code-splitting/CodeSplitting";

export const App = () => (
  <Tabs>
    <Navigating />
    <SearchParams />
    <Location />
    <CodeSplitting />
  </Tabs>
);
