import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StatusFilter } from "./components/StatusFilter";
import { TaskCounter } from "./components/TaskCounter";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";

const App = () => (
  <main>
    <p>Check Redux Devtools for dispatched actions.</p>
    <p>
      Check Root Reducer in Redux Store file:
      <span className="blue underline">./redux/store.js</span>
    </p>

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

export const Reducers = () => (
  <Provider store={store}>
    <h1>Redux Reducers</h1>
    <App />
  </Provider>
);
