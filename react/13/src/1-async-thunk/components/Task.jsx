import { useDispatch } from "react-redux";
// import { deleteTask, toggleCompleted } from "../redux/slices/tasks";

export const Task = ({ task: { id, text, completed } }) => {
  const dispatch = useDispatch();

  // const handleDelete = () => dispatch(deleteTask(id));
  const handleDelete = () => {};

  // const handleToggle = () => dispatch(toggleCompleted(id));
  const handleToggle = () => {};

  const className = completed ? "hoverable red striked" : "hoverable green";

  return (
    <div className="row" style={{ justifyContent: "flex-start" }}>
      <input
        className="hoverable"
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />

      <p className={className}>{text}</p>

      <button className="hoverable" type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
