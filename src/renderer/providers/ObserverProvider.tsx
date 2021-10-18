import React from "react";
import ObserverContext from "../contexts/ObserverContext";
import CursorObserver from "../observers/CursorObserver";
import DocumentObserver from "../observers/DocumentObserver";

const ObserverProvider: React.FC = ({ children }) => {
  const cursorObserver = React.useMemo(() => new CursorObserver(), []);
  const documentObserver = React.useMemo(() => new DocumentObserver(), []);

  return (
    <ObserverContext.Provider value={{ cursorObserver, documentObserver }}>
      {children}
    </ObserverContext.Provider>
  );
};

export default ObserverProvider;
