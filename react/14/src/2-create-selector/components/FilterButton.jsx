export const FilterButton = ({ selected, children, ...props }) => {
  const className = selected ? "hoverable green" : "hoverable";

  return (
    <button className={[className, props.className].join(" ")} {...props}>
      {children}
    </button>
  );
};
