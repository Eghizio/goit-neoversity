import { useSelector } from "react-redux";
import { Task } from "./Task";
import { selectTasks } from "../redux/slices/tasks";
import { selectFilterStatus } from "../redux/slices/filter";
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
  const tasks = useSelector(selectTasks);
  const statusFilter = useSelector(selectFilterStatus);

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
