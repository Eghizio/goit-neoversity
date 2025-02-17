import { useState } from "react";

export const RenderPolice = ({ children, shouldRender = false }) => {
  const [isRendering, setIsRendering] = useState(shouldRender);

  const toggle = () => setIsRendering((p) => !p);

  const componentName = children?.type?.name ?? "Component";

  const text = isRendering ? "Unmount" : "Mount";
  const buttonText = `${text} <${componentName} />`;

  const cls = isRendering ? "red" : "green";

  const style = { display: "block" };

  return (
    <>
      <button className={cls} style={style} type="button" onClick={toggle}>
        {buttonText}
      </button>

      {isRendering ? children : null}
    </>
  );
};
