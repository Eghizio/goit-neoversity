import { Provider, useSelector, useDispatch } from "react-redux";
// import { store } from "./redux/store";
import { TaskForm } from "./components/TaskForm";
import { TaskCounter } from "./components/TaskCounter";
import { StatusFilter } from "./components/StatusFilter";
import { TaskList } from "./components/TaskList";

import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; /* Defaults to localStorage */
import { PersistGate } from "redux-persist/integration/react";

import { tasksReducer } from "./redux/slices/tasks";
import { filtersReducer } from "./redux/slices/filter";

const LOCAL_STORAGE_KEY = "redux-persist-localstorage-key";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      state = action.payload;
      return state;
    },
    logout(state) {
      state = null;
      storage.removeItem(LOCAL_STORAGE_KEY);
      return state;
    },
  },
  /* https://redux-toolkit.js.org/api/createSlice#extrareducers */
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      console.log("Purge", { state });
      state = null;
      // storage.removeItem(LOCAL_STORAGE_KEY);
      return state;
    });
  },
  selectors: {
    getUser: (user) => user,
  },
});

const updatedRootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  user: userSlice.reducer,
});

/* https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist */
const reduxPersistConfig = {
  key: LOCAL_STORAGE_KEY,
  version: 1,
  storage,
  blacklist: [
    /* API reducers to prevent hard caching. */
  ],
};

const persistedReducer = persistReducer(reduxPersistConfig, updatedRootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

const UserProfile = () => {
  const user = useSelector(userSlice.selectors.getUser);
  const dispatch = useDispatch();

  console.log({ user });

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements["username"].value.trim();
    if (!username) {
      return alert("Please enter a username.");
    }

    dispatch(userSlice.actions.login(username));
  };

  /* Add some tasks while logged in, Purge, reload. */
  const handleLogout = () => {
    persistor.purge();
  };

  return (
    <article>
      {user !== null ? (
        <button className="hoverable red" type="button" onClick={handleLogout}>
          Logout (PURGE)
        </button>
      ) : (
        <form onSubmit={handleLogin} autoComplete="off">
          <label>
            <p>Username:</p>
            <input type="text" name="username" placeholder="Username" />
          </label>

          <button className="hoverable green" type="submit">
            Login
          </button>
        </form>
      )}
    </article>
  );
};

const App = () => {
  return (
    <main>
      <p>
        <a
          href="https://www.npmjs.com/package/redux-persist"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux Persist documentation
        </a>
      </p>

      <section className="border">
        <UserProfile />
      </section>

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

const Spinner = () => {
  console.log("Loading...");
  return <div id="spinner" />;
};

export const ReduxPersist = () => (
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <h1>Redux Toolkit (RTK) + Redux Persist</h1>
      <App />
    </PersistGate>
  </Provider>
);
