import { Tabs } from "./Tabs/Tabs";
import { ReduxStore } from "./0-redux-store/ReduxStore";
import { ReduxDevtools } from "./1-redux-devtools/ReduxDevtools";
import { Selectors } from "./2-selectors/Selectors";
import { Actions } from "./3-actions/Actions";
import { Reducers } from "./4-reducers/Reducers";
import { ComposingReducers } from "./5-composing-reducers/ComposingReducers";

export const App = () => (
  <Tabs>
    <ReduxStore />
    <ReduxDevtools />
    <Selectors />
    <Actions />
    <Reducers />
    <ComposingReducers />
  </Tabs>
);
