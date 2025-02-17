import { Tabs } from "./Tabs/Tabs";
import { FetchingData } from "./0-fetching-data/FetchingData";
import { LoadingState } from "./1-loading-state/LoadingState";
import { ErrorState } from "./2-error-state/ErrorState";
import { ApiDecoupling } from "./3-api-decoupling/ApiDecoupling";

export const App = () => (
  <Tabs>
    <FetchingData />
    <LoadingState />
    <ErrorState />
    <ApiDecoupling />
  </Tabs>
);
