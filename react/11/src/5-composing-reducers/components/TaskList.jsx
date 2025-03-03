import { useSelector } from "react-redux";
import { Task } from "./Task";
import { getTasks } from "../redux/tasks/selectors";
import { getFilterStatus } from "../redux/filter/selectors";
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
  const tasks = useSelector(getTasks);
  const statusFilter = useSelector(getFilterStatus);

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
