import { Tabs } from "./Tabs/Tabs";
import { ReduxToolkitStore } from "./0-redux-toolkit-store/ReduxToolkitStore";
import { ActionCreators } from "./1-action-creators/ActionCreators";
import { ReducerCreators } from "./2-reducer-creators/ReducerCreators";
import { Slices } from "./3-slices/Slices";
import { ReduxPersist } from "./4-redux-persist/ReduxPersist";

export const App = () => (
  <Tabs>
    <ReduxToolkitStore />
    <ActionCreators />
    <ReducerCreators />
    <Slices />
    <ReduxPersist />
  </Tabs>
);
