import { Tabs } from "./Tabs/Tabs";
import { Routing } from "./0-routing/Routing";
import { Links } from "./1-links/Links";
import { UrlParams } from "./2-url-params/UrlParams";
import { NestedRoutes } from "./3-nested-routes/NestedRoutes";
import { UsingOutlet } from "./4-using-outlet/UsingOutlet";
import { VercelDeployment } from "./5-vercel-deployment/VercelDeployment";

export const App = () => (
  <Tabs>
    <Routing />
    <Links />
    <UrlParams />
    <NestedRoutes />
    <UsingOutlet />
    <VercelDeployment />
  </Tabs>
);
