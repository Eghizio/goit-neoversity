import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StatusFilter } from "./components/StatusFilter";
import { TaskCounter } from "./components/TaskCounter";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";

const Em = ({ children }) => <em className="blue underline">{children}</em>;

const App = () => (
  <main>
    <p>
      Check <Em>Redux Devtools</Em> for dispatched actions.
    </p>

    <p>
      Check application Reducers in <Em>./redux/[tasks | filter]/</Em> files.
    </p>
    <p>
      Check Root Reducer in <Em>./redux/rootReducer.js</Em> file
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

export const ComposingReducers = () => (
  <Provider store={store}>
    <h1>Redux Composing Reducers</h1>
    <App />
  </Provider>
);
