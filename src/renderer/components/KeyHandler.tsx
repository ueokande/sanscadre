import React from "react";
import AppContext from "../AppContext";
import { isMac } from "../platform";

interface Props {
  target: HTMLElement;
}

const KeyHandler: React.FC<Props> = ({ target }) => {
  const { state, dispatch, documentClient } = React.useContext(AppContext);

  React.useEffect(() => {
    const f = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "PageUp":
          dispatch({ type: "PREV_PAGE" });
          return;
        case "ArrowDown":
        case "PageDown":
          dispatch({ type: "NEXT_PAGE" });
          return;
        case "Home":
          dispatch({ type: "FIRST_PAGE" });
          return;
        case "End":
          dispatch({ type: "LAST_PAGE" });
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
