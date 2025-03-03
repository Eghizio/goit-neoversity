import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { STATUS_FILTERS } from "./constants/filter";

const Button = ({ selected, children, ...props }) => {
  const className = selected ? "hoverable green" : "hoverable";

  return (
    <button className={[className, props.className].join(" ")} {...props}>
      {children}
    </button>
  );
};

const StatusFilter = () => {
  const filter = useSelector((state) => state.filters.status);

  const { ALL, ACTIVE, COMPLETED } = STATUS_FILTERS;

  return (
    <div>
      <Button selected={filter === ALL}>All</Button>
      <Button selected={filter === ACTIVE}>Active</Button>
      <Button selected={filter === COMPLETED}>Completed</Button>
    </div>
  );
};

const Task = ({ task: { id, text, completed } }) => {
  const className = completed ? "hoverable red striked" : "hoverable green";

  return (
    <article id={id}>
      <h3 className={className}>{text}</h3>
    </article>
  );
};

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

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const statusFilter = useSelector((state) => state.filters.status);

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

const getTasks = (state) => state.tasks;

const useTasksSelector = () => useSelector(getTasks);

const getTasksCount = (tasks) => {
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

  // const { active, completed } = tasks.reduce(
  //   (acc, task) => {
  //     if (task.completed) acc.completed += 1;
  //     else acc.active += 1;
  //     return acc;
  //   },
  //   { active: 0, completed: 0 }
  // );

  // const { active, completed } = tasks.reduce(
  //   (acc, task) => (acc[task.completed ? "completed" : "active"]++, acc),
  //   { active: 0, completed: 0 }
  // );

  return { active, completed };
};

const TaskCounter = () => {
  // const tasks = useSelector(getTasks);
  const tasks = useTasksSelector();

  const { active, completed } = getTasksCount(tasks);

  return (
    <div>
      <p>Active: {active}</p>
      <p>Completed: {completed}</p>
    </div>
  );
};

const App = () => {
  return (
    <main>
      <StatusFilter />

      <TaskCounter />

      <TaskList />
    </main>
  );
};

export const Selectors = () => {
  return (
    <Provider store={store}>
      <h1>Redux Selectors</h1>
      <App />
    </Provider>
  );
};
