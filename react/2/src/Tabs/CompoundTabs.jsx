import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TabsContext = createContext(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);

  if (context === undefined) {
    throw new Error("Tabs should be within TabsContext!");
  }

  return context;
};

const TabsProvider = ({ children }) => {
  const [tab, setTab] = useState();
  const [tabsRegistry, setTabRegistry] = useState([]);

  const registerTab = (tabName) => {
    setTabRegistry((p) => Array.from(new Set([...p, tabName])));
  };

  const value = useMemo(
    () => ({ tab, setTab, tabsRegistry, registerTab }),
    [tab, setTab, tabsRegistry]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export const Tabs = ({ children }) => (
  <TabsProvider>
    <TabsContainer>{children}</TabsContainer>
  </TabsProvider>
);

const TabsContainer = ({ children }) => {
  const { tab, setTab, tabsRegistry } = useTabs();

  const enableTab = useCallback((name) => {
    setTab(name);
  }, []);

  const isActive = (tabName) => tabName === tab;

  return (
    <div style={styles.container}>
      <ol style={styles.tabsList}>
        {tabsRegistry.map((tabName) => (
          <li
            key={tabName}
            className="clickable"
            style={styles.tab(isActive(tabName))}
            onClick={() => enableTab(tabName)}
          >
            {tabName}
          </li>
        ))}
      </ol>
      <div>{children}</div>
    </div>
  );
};

Tabs.Tab = ({ name, children }) => {
  const { tab, registerTab } = useTabs();

  useEffect(() => {
    registerTab(name);
  }, []);

  const isTabActive = tab === name;

  return isTabActive ? children : null;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  tabsList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
  },
  tab: (isActive) => ({
    backgroundColor: "dodgerblue",
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
    padding: "1rem 2 rem",
    width: "200px",
    height: "30px",
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    ...{
      ...(isActive && {
        filter: "brightness(0.9)",
        color: "orange",
      }),
    },
  }),
};
