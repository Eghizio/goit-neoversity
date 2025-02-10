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

const UncontrolledRegisterPlayerForm = ({ label, uponSubmission }) => {
  const serverFieldId = useId();

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { username, password, server } = form.elements;

    const user = {
      username: username.value.trim(),
      password: password.value,
      server: server.value,
    };

    if (uponSubmission) uponSubmission(user);

    event.target.reset();
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <FormField label="Username" type="text" name="username" />
      <FormField label="Password" type="password" name="password" />

      <label htmlFor={serverFieldId}>
        Server:
        <select name="server" id={serverFieldId}>
          <option value="">Wybierz server</option>
          <option value="s1">Monastyr</option>
          <option value="s2">Feniks</option>
          <option value="s3">Obsydian</option>
          <option value="s4">Twierdza</option>
        </select>
      </label>

      <button className="orange" type="submit">
        {label}
      </button>
    </form>
  );
};

const ControlledFormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  const id = useId();

  const fieldId = `${name}-${id}`;

  return (
    <label htmlFor={fieldId}>
      {label}:
      <input
        type={type}
        name={name}
        id={fieldId}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

const ControlledSelectField = ({
  label,
  name,
  value,
  onChange,
  children: options,
}) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      {label}:
      <select name={name} id={id} value={value} onChange={onChange}>
        {options}
      </select>
    </label>
  );
};

const ControlledRegisterPlayerForm = ({ label, uponSubmission }) => {
  const serverFieldId = useId();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const user = { username: username.trim(), password, server };

    if (uponSubmission) uponSubmission(user);

    setUsername("");
    setPassword("");
    setServer("");
  };

  const allServers = [
    { id: "s1", name: "Monastyr" },
    { id: "s2", name: "Feniks" },
    { id: "s3", name: "Obsydian" },
    { id: "s4", name: "Twierdza" },
  ];

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <ControlledFormField
        label="Username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ControlledFormField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ControlledSelectField
        label="Server"
        name="server"
        value={server}
        onChange={(e) => setServer(e.target.value)}
      >
        <option value="">Wybierz server</option>
        {allServers.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </ControlledSelectField>

      <label htmlFor={serverFieldId}>
        Server:
        <select
          name="server"
          id={serverFieldId}
          value={server}
          onChange={(e) => setServer(e.target.value)}
        >
          <option value="">Wybierz server</option>
          <option value="s1">Monastyr</option>
          <option value="s2">Feniks</option>
          <option value="s3">Obsydian</option>
          <option value="s4">Twierdza</option>
        </select>
      </label>

      <button className="green" type="submit">
        {label}
      </button>
    </form>
  );
};

export const SelectInput = () => {
  const register = (user) => console.log(`Register: `, user);

  const login = (user) => console.log(`Login: `, user);

  return (
    <main className="col wide-gap">
      <h1>Select input</h1>

      <section className="col">
        <h2>Uncontrolled Form with Select</h2>

        <UncontrolledRegisterPlayerForm
          label="Register"
          uponSubmission={register}
        />
      </section>

      <section className="col">
        <h2>Controlled Form with Select</h2>

        <ControlledRegisterPlayerForm label="Login" uponSubmission={login} />
      </section>
    </main>
  );
};
