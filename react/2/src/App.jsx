import { Tabs as CompoundTabs } from "./Tabs/CompoundTabs";
import { Tabs as SimpleTabs } from "./Tabs/Tabs";

import { StyleProp } from "./0-style-prop/StyleProp";
import { Css } from "./1-css/Css";
import { ClassComposition } from "./2-class-composition/ClassComposition";
import { Clsx } from "./3-clsx/Clsx";
import { Globals } from "./4-globals/Globals";
import { ReusingStyles } from "./5-reusing-styles/ReusingStyles";
import { CssModules } from "./6-css-modules/CssModules";
import { Normalization } from "./7-normalization/Normalization";
import { ReactIcons } from "./8-react-icons/ReactIcons";

export const App = () => <WithCompoundTabs />;
// export const App = () => <WithSimpleTabs />;

const WithCompoundTabs = () => (
  <CompoundTabs>
    <CompoundTabs.Tab name="Style prop">
      <StyleProp />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="CSS">
      <Css />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="Class composition">
      <ClassComposition />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="Clsx">
      <Clsx />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="Globals">
      <Globals />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="Reusing styles">
      <ReusingStyles />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="CSS Modules">
      <CssModules />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="Normalization">
      <Normalization />
    </CompoundTabs.Tab>
    <CompoundTabs.Tab name="React Icons">
      <ReactIcons />
    </CompoundTabs.Tab>
  </CompoundTabs>
);

const WithSimpleTabs = () => (
  <SimpleTabs>
    <StyleProp />
    <Css />
    <ClassComposition />
    <Clsx />
    <Globals />
    <ReusingStyles />
    <CssModules />
    <Normalization />
    <ReactIcons />
  </SimpleTabs>
);
