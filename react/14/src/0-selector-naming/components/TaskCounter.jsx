import { useSelector } from "react-redux";
import { selectTasks } from "../redux/slices/tasks";

export const TaskCounter = () => {
  const tasks = useSelector(selectTasks);

  const { active, completed } = tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );

  return (
    <div>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>
    </div>
  );
};
