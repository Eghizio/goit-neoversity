import { Tabs } from "./Tabs/Tabs";
import { FormikLibrary } from "./0-formik-library/FormikLibrary";
import { FormikInputFields } from "./1-formik-input-fields/FormikInputFields";
import { Validation } from "./2-validation/Validation";

export const App = () => (
  <Tabs>
    <FormikLibrary />
    <FormikInputFields />
    <Validation />
  </Tabs>
);
