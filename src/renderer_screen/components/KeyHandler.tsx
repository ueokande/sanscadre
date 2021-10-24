import React from "react";
import AppContext from "../AppContext";
import { isMac } from "../platform";
import useDocumentClient from "../../renderer/hooks/useDocumentClient";
import useCursorClient from "../../renderer/hooks/useCursorClient";

interface Props {
  target: HTMLElement;
}

const KeyHandler: React.FC<Props> = ({ target }) => {
  const documentClient = useDocumentClient();
  const cursorClient = useCursorClient();
  const { state, dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    const f = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "PageUp":
          cursorClient?.goPrev();
          return;
        case "ArrowDown":
        case "PageDown":
          cursorClient?.goNext();
          return;
        case "Home":
          cursorClient?.goFirst();
          return;
        case "End":
          cursorClient?.goLast();
          return;
        case "Backspace":
        case "Delete":
          documentClient?.remove(
            Array.from(state.selected).map((i) => state.pages[i])
          );
          return;
        case "a":
          if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
            dispatch({ type: "SELECT_ALL" });
          }
      }
    };
    target.addEventListener("keydown", f);

    return () => {
      target.removeEventListener("keydown", f);
    };
  }, [target, state]);

  return null;
};

export default KeyHandler;
