/* Custom Hooks & Rule of Hooks */

/* https://react.dev/warnings/invalid-hook-call-warning
✅ Call them at the top level in the body of a function component.
✅ Call them at the top level in the body of a custom Hook.

🔴 Do not call Hooks inside conditions or loops.
🔴 Do not call Hooks after a conditional return statement.
🔴 Do not call Hooks in event handlers.
🔴 Do not call Hooks in class components.
🔴 Do not call Hooks inside functions passed to useMemo, useReducer, or useEffect.
*/
import { useEffect, useState } from "react";

// Must start with "use"
const useOurOwnHook = (initialValue) => {
  const [someValue, setSomeValue] = useState(initialValue);
};

const BreakingRulesOfHooks = () => {
  const error = Math.random() > 0.5;

  if (!error) {
    // useOurOwnHook(); // Illegal
  }

  for (let i = 0; i < 3; i++) {
    // useOurOwnHook(); // Illegal
  }

  useEffect(() => {
    // useOurOwnHook(); // Illegal
  }, []);

  if (error) return "Error";

  // useOurOwnHook(); // Illegal

  return null;
};

const useModal = (initiallyOpened = false, onStateChange = undefined) => {
  const [isOpen, setIsOpen] = useState(Boolean(initiallyOpened));

  useEffect(() => {
    if (onStateChange) {
      onStateChange(isOpen);
    }
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((previous) => !previous);

  return { isOpen, open, close, toggle };
};

const Modal = () => <h2 style={{ color: "dodgerblue" }}>Modal</h2>;

export const CustomHooks = () => {
  // const onModalToggle = (currentState) => console.log("State changed to: ", currentState);
  const { isOpen, open, close } = useModal(true, (currentState) => {
    console.log("State changed to: ", currentState);
  });

  console.log({ isOpen });

  return (
    <main className="col wide-gap">
      <h1>CustomHooks</h1>

      {/* <BreakingRulesOfHooks /> */}

      <div className="col wide-gap border">
        <button onClick={open}>✅ Open Modal</button>
        <button onClick={close}>❌ Close Modal</button>

        {isOpen ? <Modal /> : null}
      </div>
    </main>
  );
};
