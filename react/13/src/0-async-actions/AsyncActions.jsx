import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { getTasks } from "./redux/slices/tasks";
// import { TaskForm } from "./components/TaskForm";
// import { TaskCounter } from "./components/TaskCounter";
// import { StatusFilter } from "./components/StatusFilter";
// import { TaskList } from "./components/TaskList";
import { fetchTasks } from "./redux/operations/tasks";

const App = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) return <p className="red">Error fetching tasks: {error}</p>;
  if (isLoading) return <p className="blue">Loading tasks...</p>;

  return (
    <main>
      <p className="green">
        {items.length > 0 ? JSON.stringify(items, null, 2) : null}
      </p>
    </main>
  );
};

export const AsyncActions = () => (
  <Provider store={store}>
    <h1>Async Actions</h1>
    <App />
  </Provider>
);
