import { Tabs } from "./Tabs/Tabs";
import { UncontrolledForms } from "./0-uncontrolled-forms/UncontrolledForms";
import { ConfigurableForms } from "./1-configurable-forms/ConfigurableForms";
import { FieldIdentifier } from "./2-field-identifier/FieldIdentifier";
import { ControlledForms } from "./3-controlled-forms/ControlledForms";
import { SelectInput } from "./4-select-input/SelectInput";
import { RadioInput } from "./5-radio-input/RadioInput";
import { CheckboxInput } from "./6-checkbox-input/CheckboxInput";
import { GenericForm } from "./7-generic-form/GenericForm";
import { ManagingCollections } from "./8-managing-collections/ManagingCollections";

export const App = () => (
  <Tabs>
    <UncontrolledForms />
    <ConfigurableForms />
    <FieldIdentifier />
    <ControlledForms />
    <SelectInput />
    <RadioInput />
    <CheckboxInput />
    <GenericForm />
    <ManagingCollections />
  </Tabs>
);
