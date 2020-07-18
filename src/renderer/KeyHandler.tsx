import React from "react";
import AppContext from "./AppContext";

interface Props {
  target: HTMLElement;
}

const KeyHandler: React.FC<Props> = ({ target }: Props) => {
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
      }
    });
  }, [target]);

  return null;
};

export default KeyHandler;
