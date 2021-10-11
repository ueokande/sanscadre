import React from "react";
import AppContext from "../AppContext";
import { isMac } from "../platform";

interface Props {
  target: HTMLElement;
}

const KeyHandler: React.FC<Props> = ({ target }) => {
  const { dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    target.addEventListener("keydown", (e) => {
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
          dispatch({ type: "DELETE_SELECTED" });
          return;
        case "a":
          if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
            dispatch({ type: "SELECT_ALL" });
          }
      }
    });
  }, [target]);

  return null;
};

export default KeyHandler;
