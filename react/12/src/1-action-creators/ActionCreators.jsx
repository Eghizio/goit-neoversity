import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { StatusFilter } from "./components/StatusFilter";
import { TaskList } from "./components/TaskList";

const App = () => {
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

export const ActionCreators = () => (
  <Provider store={store}>
    <h1>Redux Toolkit (RTK) - Action Creators</h1>
    <App />
  </Provider>
);
