import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted } from "../redux/tasks/actions";

export const Task = ({ task: { id, text, completed } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(id));

  const handleToggle = () => dispatch(toggleCompleted(id));

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
