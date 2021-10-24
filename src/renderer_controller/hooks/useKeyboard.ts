import React from "react";
import useCursorClient from "../../renderer/hooks/useCursorClient";

const useKeyboard = () => {
  const cursorClient = useCursorClient();

  const f = React.useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "PageUp":
      case "ArrowUp":
      case "ArrowLeft":
        cursorClient.goPrev();
        return;
      case "PageDown":
      case "ArrowDown":
      case "ArrowRight":
        cursorClient?.goNext();
        return;
      case "Home":
        cursorClient?.goFirst();
        return;
      case "End":
        cursorClient?.goLast();
        return;
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("keydown", f);

    return () => {
      window.removeEventListener("keydown", f);
    };
  }, []);
};

export default useKeyboard;
