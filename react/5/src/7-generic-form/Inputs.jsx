import { useId } from "react";

export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      {label}:
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
};

export const Select = ({
  label,
  name,
  defaultValue,
  value,
  onChange,
  children: options,
  required = false,
}) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      {label}:
      <select
        name={name}
        id={id}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options}
      </select>
    </label>
  );
};

export const Radio = ({
  name,
  label,
  defaultChecked,
  checked,
  value,
  onChange,
  required = false,
}) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        value={value}
        onChange={onChange}
        required={required}
      />
      {label}
    </label>
  );
};

export const Checkbox = ({
  name,
  label,
  defaultChecked,
  checked,
  onChange,
  required = false,
}) => {
  const id = useId();

  return (
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        required={required}
      />
      {label}
    </label>
  );
};
