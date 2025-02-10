import { useId } from "react";

const FormWithoutFieldIdentifiers = ({ label, onSubmit }) => {
  console.log(
    "If two of such forms will be rendered we get Error with non unique input fields id and name"
  );

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <label htmlFor="username">
        Username:
        <input type="text" name="username" id="username" />
      </label>

      <label htmlFor="password">
        Password:
        <input type="password" name="password" id="password" />
      </label>

      <button className="orange" type="submit">
        {label}
      </button>
    </form>
  );
};

const FormField = ({ label, type = "text", name }) => {
  const id = useId();

  const fieldId = `${name}-${id}`;

  return (
    <label htmlFor={fieldId}>
      {label}:
      <input type={type} name={name} id={fieldId} />
    </label>
  );
};

const FormWithFieldIdentifiers = ({ label, uponSubmission }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { username, password } = form.elements;

    const user = {
      username: username.value.trim(),
      password: password.value,
    };

    alert(`Registering user: ${JSON.stringify(user, null, 2)}`);

    if (uponSubmission) uponSubmission(user);

    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <FormField label="Username" type="text" name="username" />
      <FormField label="Password" type="password" name="password" />

      <button className="green" type="submit">
        {label}
      </button>
    </form>
  );
};

export const FieldIdentifier = () => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { username, password } = form.elements;

    const user = {
      username: username.value.trim(),
      password: password.value,
    };

    console.log("Form submitted with: ", user);

    form.reset();
  };

  return (
    <main className="col wide-gap">
      <h1>Field identifiers</h1>

      <section className="col">
        <h2>Forms without field identifiers</h2>

        <FormWithoutFieldIdentifiers label="Register" onSubmit={onSubmit} />
        {/* <FormWithoutFieldIdentifiers label="Register" onSubmit={onSubmit} /> */}
      </section>

      <section className="col">
        {/* <h2>Forms with field identifiers</h2>

        <FormWithFieldIdentifiers label="Login" onSubmit={onSubmit} /> */}
        {/* <FormWithFieldIdentifiers label="Login" onSubmit={onSubmit} /> */}
      </section>
    </main>
  );
};
