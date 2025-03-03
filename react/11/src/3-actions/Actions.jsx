import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { StatusFilter } from "./components/StatusFilter";
import { TaskCounter } from "./components/TaskCounter";
import { TaskList } from "./components/TaskList";

const addTask = (text) => {
  return {
    type: "tasks/addTask",
    payload: {
      id: crypto.randomUUID(),
      completed: false,
      text,
    },
  };
};

/* Used within <Task /> */
export const deleteTask = (taskId) => {
  return {
    type: "tasks/deleteTask",
    payload: taskId,
  };
};

export const toggleCompleted = (taskId) => {
  return {
    type: "tasks/toggleCompleted",
    payload: taskId,
  };
};

export const setStatusFilter = (filterStatus) => {
  return {
    type: "filters/setStatusFilter",
    payload: filterStatus,
  };
};

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const taskText = form.elements["text"].value;

    /* Dispatch (send) Action for Adding Task to Redux Root Reducer. */
    const action = addTask(taskText);
    dispatch(action);

    // dispatch(addTask(taskText));

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="Enter task text..." />
      <button type="submit">Add task</button>
    </form>
  );
};

const App = () => (
  <main>
    <p>Check Redux Devtools for dispatched actions</p>

    <section className="border">
      <TaskForm />
    </section>

    <section className="border">
      <h2>Tasks</h2>
      <TaskCounter />
      <StatusFilter />
      <TaskList />
    </section>
  </main>
);

export const Actions = () => (
  <Provider store={store}>
    <h1>Redux Actions</h1>
    <App />
  </Provider>
);
