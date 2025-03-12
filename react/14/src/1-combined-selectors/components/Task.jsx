import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted } from "../redux/operations/tasks";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  const handleToggle = () => dispatch(toggleCompleted(task));

  const className = task.completed
    ? "hoverable red striked"
    : "hoverable green";

  return (
    <div className="row" style={{ justifyContent: "flex-start" }}>
      <input
        className="hoverable"
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />

      <p className={className}>{task.text}</p>

      <button className="hoverable" type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
