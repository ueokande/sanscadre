import React from "react";
import AppContext from "./AppContext";

interface Props {
  target: HTMLElement;
}

const KeyHandler: React.FC<Props> = ({ target }: Props) => {
  const { state, dispatch } = React.useContext(AppContext);
  const stateRef = React.useRef(state);
  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

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
          if (e.ctrlKey) {
            dispatch({ type: "SELECT_ALL" });
          }
      }
    });
  }, [target]);

  return null;
};

export default KeyHandler;
