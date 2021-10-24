import React from "react";
import CursorObserver from "../observers/CursorObserver";
import DocumentObserver from "../observers/DocumentObserver";

const ObserverContext = React.createContext<{
  cursorObserver?: CursorObserver;
  documentObserver?: DocumentObserver;
}>({});

export default ObserverContext;
