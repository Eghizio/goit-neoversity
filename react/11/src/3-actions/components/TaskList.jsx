import { Task } from "./Task";
import { useTasksSelector, useFilterStatusSelector } from "../redux/selectors";
import { STATUS_FILTERS } from "../constants/filter";

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case STATUS_FILTERS.ACTIVE: {
      return tasks.filter((task) => !task.completed);
    }

    case STATUS_FILTERS.COMPLETED: {
      return tasks.filter((task) => task.completed);
    }

    case STATUS_FILTERS.ALL:
    default: {
      return tasks;
    }
  }
};

export const TaskList = () => {
  const tasks = useTasksSelector();
  const statusFilter = useFilterStatusSelector();

  const visibleTasks = getVisibleTasks(tasks, statusFilter);

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
