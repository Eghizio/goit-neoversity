import { Tabs } from "./Tabs/Tabs";
import { Events } from "./0-events/Events";
import { Callbacks } from "./1-callbacks/Callbacks";
import { State } from "./2-state/State";
import { Communication } from "./3-communication/Communication";
import { ComplexState } from "./4-complex-state/ComplexState";

export const App = () => (
  <Tabs>
    <Events />
    <Callbacks />
    <State />
    <Communication />
    <ComplexState />
  </Tabs>
);
