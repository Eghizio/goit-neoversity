export const Capitalize = ({ text, style, ...props }) => (
  <span
    className="blue"
    style={{ textTransform: "capitalize", ...style }}
    {...props}
  >
    {text}
  </span>
);
