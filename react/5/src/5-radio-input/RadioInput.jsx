import { useId, useState } from "react";

const UncontrolledRadio = ({ label, uponSubmission }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { server } = form.elements;

    const data = {
      server: server.value,
    };

    if (uponSubmission) uponSubmission(data);
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <label htmlFor="server1">
        <input type="radio" name="server" value="s1" id="server1" />
        Monastyr
      </label>

      <label htmlFor="server2">
        <input type="radio" name="server" value="s2" id="server2" />
        Feniks
      </label>

      <label htmlFor="server3">
        <input
          type="radio"
          name="server"
          value="s3"
          id="server3"
          defaultChecked
        />
        Obsydian
      </label>

      <label htmlFor="server4">
        <input type="radio" name="server" value="s4" id="server4" />
        Twierdza
      </label>

      <button className="orange" type="submit">
        {label}
      </button>
    </form>
  );
};

const ControlledRadioField = ({ name, label, checked, value, onChange }) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        // defaultChecked
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

const allServers = [
  { id: "s1", name: "Monastyr" },
  { id: "s2", name: "Feniks" },
  { id: "s3", name: "Obsydian" },
  { id: "s4", name: "Twierdza" },
];

const ControlledRadio = ({ label, uponSubmission }) => {
  // const [server, setServer] = useState(allServers.at(-1).id); // Will fail with empty array.
  const [server, setServer] = useState(allServers?.at(-1)?.id ?? "");

  const onSubmit = (event) => {
    event.preventDefault();

    const data = { server };

    if (uponSubmission) uponSubmission(data);
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      {allServers.map(({ id, name }) => (
        <ControlledRadioField
          key={id}
          name="server"
          label={name}
          checked={server === id}
          value={id}
          onChange={(e) => setServer(e.target.value)}
        />
      ))}

      <button className="green" type="submit">
        {label}
      </button>
    </form>
  );
};

export const RadioInput = () => {
  const pickServer = (data) => console.log(`Picked: `, data);

  return (
    <main className="col wide-gap">
      <h1>Radio input</h1>

      <section className="col">
        <h2>Uncontrolled Form with Radio</h2>

        <UncontrolledRadio label="Wybierz server" uponSubmission={pickServer} />
      </section>

      <section className="col">
        <h2>Controlled Form with Radio</h2>

        <ControlledRadio
          label="Zagraj na tym serwerze"
          uponSubmission={pickServer}
        />
      </section>
    </main>
  );
};
