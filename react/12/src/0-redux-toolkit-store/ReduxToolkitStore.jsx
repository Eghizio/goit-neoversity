import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";

import { rootReducer } from "./redux/rootReducer";

import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { StatusFilter } from "./components/StatusFilter";
import { TaskList } from "./components/TaskList";

const store = configureStore({
  reducer: rootReducer,
});

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

export const ReduxToolkitStore = () => (
  <Provider store={store}>
    <h1>Redux Toolkit (RTK) - Store</h1>
    <App />
  </Provider>
);
