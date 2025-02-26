export const Capitalize = ({ text, ...props }) => (
  <span className="blue" style={{ textTransform: "capitalize" }} {...props}>
    {text}
  </span>
);
