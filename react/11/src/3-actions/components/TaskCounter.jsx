import { useTasksSelector } from "../redux/selectors";

export const TaskCounter = () => {
  const tasks = useTasksSelector();

  const { active, completed } = tasks.reduce(
    (acc, task) => {
      if (task.completed) acc.completed += 1;
      else acc.active += 1;
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
