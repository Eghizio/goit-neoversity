import { useState } from "react";
import { Checkbox, Input, Radio, Select } from "./Inputs";

const RegisterForm = ({ label, uponSubmission, values, onValueChange }) => {
  return (
    <form onSubmit={uponSubmission} className="col border" autoComplete="off">
      <Input
        label="Username"
        type="text"
        name="username"
        value={values["username"] ?? ""}
        onChange={onValueChange}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={values["password"] ?? ""}
        onChange={onValueChange}
        required
      />
      <Checkbox
        name="tos"
        label="Akceptuję regulamin"
        checked={values["tos"] ?? false}
        onChange={onValueChange}
        required
      />

      <button className="orange" type="submit">
        {label}
      </button>
    </form>
  );
};

const EmailNewsletterForm = ({
  label,
  uponSubmission,
  values,
  onValueChange,
}) => {
  return (
    <form onSubmit={uponSubmission} className="col border" autoComplete="off">
      <Input
        type="email"
        label="Email"
        name="email"
        value={values["email"] ?? ""}
        onChange={onValueChange}
        required
      />

      <Select
        label="Category"
        name="category"
        value={values["category"]}
        onChange={onValueChange}
        required
      >
        <option value="">Select category</option>
        <option value="programming">Programming</option>
        <option value="cooking">Cooking</option>
      </Select>

      <Radio
        name="subscription"
        label="Weekly subscription"
        value="weekly"
        checked={values["weekly"]}
        onChange={onValueChange}
        required
      />
      <Radio
        name="subscription"
        label="Monthly subscription"
        value="monthly"
        checked={values["monthly"]}
        onChange={onValueChange}
        required
      />

      <button className="green" type="submit">
        {label}
      </button>
    </form>
  );
};

const initialValues = {
  // username: "",
  // password: "",
  // tos: false,
  // email: "",
  // category: "programming",
  // subscription: "weekly",
};

const getValue = (target) =>
  ["checkbox"].includes(target.type) ? target.checked : target.value;

export const GenericForm = () => {
  const [values, setValues] = useState(initialValues);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted: ", values);
    setValues(initialValues);
    event.target.reset();
  };

  const onInputChange = (event) => {
    setValues((prev) => ({
      ...prev,
      // [event.target.name]: event.target.value,
      [event.target.name]: getValue(event.target),
    }));
  };

  return (
    <main className="col wide-gap">
      <h1>Generic Form handling</h1>

      <section className="col">
        <h2>Register form</h2>

        <RegisterForm
          label="Rejestruję się"
          uponSubmission={onSubmit}
          values={values}
          onValueChange={onInputChange}
        />
      </section>

      <section className="col">
        {/* <h2>Email Newsletter sign up</h2>

        <EmailNewsletterForm
          label="Zapisuję się na newsletter"
          uponSubmission={onSubmit}
          values={values}
          onValueChange={onInputChange}
        /> */}
      </section>
    </main>
  );
};
