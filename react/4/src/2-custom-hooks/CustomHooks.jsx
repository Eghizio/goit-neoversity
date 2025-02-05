/* Custom Hooks & Rule of Hooks */
// https://react.dev/warnings/invalid-hook-call-warning
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

const Modal = () => <h2>Modal</h2>;

export const CustomHooks = () => {
  const { isOpen, open, close } = useModal(true, (currentState) => {
    console.log("State changed to: ", currentState);
  });

  console.log({ isOpen });

  return (
    <main className="col wide-gap">
      <h1>CustomHooks</h1>

      {/* <BreakingRulesOfHooks /> */}

      <div className="col wide-gap border">
        <button onClick={open}>Open Modal</button>
        <button onClick={close}>Close Modal</button>

        {isOpen ? <Modal /> : null}
      </div>
    </main>
  );
};
