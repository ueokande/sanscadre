import React from "react";
import CursorObserver from "../observers/CursorObserver";
import ObserverContext from "../contexts/ObserverContext";

const useCursorObserver = (): CursorObserver => {
  const { cursorObserver } = React.useContext(ObserverContext);
  if (typeof cursorObserver === "undefined") {
    throw new Error("CursorObserver not providerd");
  }
  return cursorObserver;
};

export default useCursorObserver;
