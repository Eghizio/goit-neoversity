import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { getError, getIsLoading } from "./redux/slices/tasks";
import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { StatusFilter } from "./components/StatusFilter";
import { TaskList } from "./components/TaskList";
import { fetchTasks } from "./redux/operations/tasks";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) return <p className="red">Error fetching tasks: {error}</p>;
  if (isLoading) return <p className="blue">Loading tasks...</p>;

  return (
    <main>
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
};

export const AsyncTaskList = () => (
  <Provider store={store}>
    <h1>Async Thunk</h1>
    <App />
  </Provider>
);
