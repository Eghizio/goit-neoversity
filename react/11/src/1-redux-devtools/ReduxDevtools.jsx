import { createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { Provider } from "react-redux";

const initialState = {
  tasks: [
    { id: 0, text: "Learn HTML and CSS", completed: true },
    { id: 1, text: "Get good at JavaScript", completed: true },
    { id: 2, text: "Master React", completed: false },
    { id: 3, text: "Discover Redux", completed: false },
    { id: 4, text: "Build amazing apps", completed: false },
  ],
  filters: {
    status: "all",
  },
};

const rootReducer = (state = initialState, action) => {
  return state;
};

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);

const Devtools = () => {
  return (
    <main>
      <h2>Redux Devtools Extension for:</h2>

      <ul>
        <li>
          <a
            href="https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
        </li>

        <li>
          <a
            href="https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>

        <li>
          <a
            href="https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edge
          </a>
        </li>
      </ul>
    </main>
  );
};

export const ReduxDevtools = () => {
  return (
    <Provider store={store}>
      <h1>Redux DevTools</h1>
      <Devtools />
    </Provider>
  );
};
