import { useId, useState } from "react";

const UncontrolledCheckbox = ({ label, uponSubmission }) => {
  const id = useId();

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { marketing } = form.elements;

    console.log(marketing.value);

    const data = {
      marketing: marketing.checked,
    };

    if (uponSubmission) uponSubmission(data);
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <label htmlFor={id}>
        <input id={id} type="checkbox" name="marketing" defaultChecked={true} />
        {label}
      </label>

      <button className="orange" type="submit">
        Potwierdzam
      </button>
    </form>
  );
};

const ControlledCheckboxInput = ({ name, label, checked, onChange }) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

const ControlledCheckbox = ({ label, uponSubmission }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const data = { isAccepted };

    if (uponSubmission) uponSubmission(data);
  };

  return (
    <form onSubmit={onSubmit} className="col border" autoComplete="off">
      <ControlledCheckboxInput
        name="tos"
        label={label}
        checked={isAccepted}
        onChange={(e) => {
          console.log(e.target.value);
          setIsAccepted(e.target.checked);
        }}
      />

      <button className="green" type="submit">
        Potwierdzam
      </button>
    </form>
  );
};

export const CheckboxInput = () => {
  const uponAcceptingTOS = (data) => console.log(`Result: `, data);

  return (
    <main className="col wide-gap">
      <h1>Checkbox input</h1>

      <section className="col">
        <h2>Uncontrolled Form with Checkbox</h2>

        <UncontrolledCheckbox
          label="Zgadzam się na dostawanie spamu, yyy znaczy ofert marketingowych."
          uponSubmission={uponAcceptingTOS}
        />
      </section>

      <section className="col">
        {/* <h2>Controlled Form with Checkbox</h2>

        <ControlledCheckbox
          label="Zgadzam się z regulaminem strony"
          uponSubmission={uponAcceptingTOS}
        /> */}
      </section>
    </main>
  );
};
