import { useId, useState } from "react";

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

const UncontrolledAuthForm = ({ label, uponSubmission }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { username, password } = form.elements;

    const user = {
      username: username.value.trim(),
      password: password.value,
    };

    if (uponSubmission) uponSubmission(user);

    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <FormField label="Username" type="text" name="username" />
      <FormField label="Password" type="password" name="password" />

      <button className="orange" type="submit">
        {label}
      </button>
    </form>
  );
};

const ControlledAuthForm = ({ label, uponSubmission }) => {
  const usernameFieldId = useId();
  const passwordFieldId = useId();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (event) => {
    // const value = event.target.value.trim(); // No spaces hehe.
    const value = event.target.value;

    console.log("Username:", value);

    setUsername(value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmission = () => {
    // Enter doesn't work anymore as we are handling button click.
    const user = { username: username.trim(), password };

    if (uponSubmission) uponSubmission(user);

    // ResetForm
    setUsername("");
    setPassword("");
  };

  const onSubmit = (event) => {
    // Enter will work upon form submission if the button type is "submit"
    event.preventDefault();

    handleSubmission();

    event.target.reset();
  };

  return (
    <form className="col border" autoComplete="off" onSubmit={onSubmit}>
      <label htmlFor={usernameFieldId}>
        Username:
        <input
          type="text"
          name="username"
          id={usernameFieldId}
          value={username}
          onChange={onUsernameChange}
        />
      </label>

      <label htmlFor={passwordFieldId}>
        Password:
        <input
          type="password"
          name="password"
          id={passwordFieldId}
          value={password}
          onChange={onPasswordChange}
          // onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="green">{label}</button>

      {/* <button className="green" type="button" onClick={handleSubmission}>
        {label}
      </button> */}
    </form>
  );
};

export const ControlledForms = () => {
  const register = (user) => console.log(`Register: `, user);

  const login = (user) => console.log(`Login: `, user);

  return (
    <main className="col wide-gap">
      <h1>Controlled Forms</h1>

      <section className="col">
        <h2>Uncontrolled Form</h2>

        <UncontrolledAuthForm label="Register" uponSubmission={register} />
      </section>

      <section className="col">
        <h2>Controlled Form</h2>

        <ControlledAuthForm label="Login" uponSubmission={login} />
      </section>
    </main>
  );
};
