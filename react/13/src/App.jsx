import { Tabs } from "./Tabs/Tabs";
import { AsyncActions } from "./0-async-actions/AsyncActions";
import { AsyncThunk } from "./1-async-thunk/AsyncThunk";
import { AsyncTaskList } from "./2-async-task-list/AsyncTaskList";

export const App = () => (
  <Tabs>
    <AsyncActions />
    <AsyncThunk />
    <AsyncTaskList />
  </Tabs>
);
