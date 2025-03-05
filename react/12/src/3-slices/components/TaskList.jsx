import { useSelector } from "react-redux";
import { Task } from "./Task";
// import { getTasks } from "../redux/selectors/tasks";
import { getTasks } from "../redux/slices/tasks";
// import { getFilterStatus } from "../redux/selectors/filter";
import { getFilterStatus } from "../redux/slices/filter";
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
