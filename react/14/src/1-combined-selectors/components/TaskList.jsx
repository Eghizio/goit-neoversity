import { useSelector } from "react-redux";
import { Task } from "./Task";
import { selectVisibleTasks } from "../redux/selectors";

export const TaskList = () => {
  const visibleTasks = useSelector(selectVisibleTasks);

  return (
    <ul>
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
