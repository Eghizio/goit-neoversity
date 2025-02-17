import { Children, useEffect, useRef } from "react";
import css from "./Tabs.module.css";
import { useLocalStorage } from "./useLocalStorage";

const getSelectedComponentName = (child, index) =>
  child?.type?.name ?? (index + 1).toString();

export const Tabs = ({ children }) => {
  // Todo: Handle iff the last selected index from other App is out of children array boundary.
  const [selectedTabIndex, setSelectedTabIndex] = useLocalStorage(0);
  const ref = useRef(document.title);

  const ChildrenArray = Children.toArray(children);

  const displayedChild = ChildrenArray[selectedTabIndex];

  const componentName = getSelectedComponentName(
    displayedChild,
    selectedTabIndex
  );

  useEffect(() => {
    document.title = `${componentName} - ${ref.current}`;
  }, [selectedTabIndex]);

  const activeClass = (i) =>
    i === selectedTabIndex ? `${css["tab"]} ${css["active"]}` : css["tab"];

  const tabs = ChildrenArray.map((child, i) => ({
    i,
    name: getSelectedComponentName(child, i),
  }));

  return (
    <>
      <header className={css["tab-bar"]}>
        {tabs.map(({ i, name }) => (
          <span
            key={i}
            className={activeClass(i)}
            onClick={() => setSelectedTabIndex(i)}
            title={name}
          >
            {i + 1}
          </span>
        ))}
      </header>

      {displayedChild}
    </>
  );
};
