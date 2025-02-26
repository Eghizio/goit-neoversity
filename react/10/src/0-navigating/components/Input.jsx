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
