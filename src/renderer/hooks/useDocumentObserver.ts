import React from "react";
import DocumentObserver from "../observers/DocumentObserver";
import ObserverContext from "../contexts/ObserverContext";

const useDocumentObserver = (): DocumentObserver => {
  const { documentObserver } = React.useContext(ObserverContext);
  if (typeof documentObserver === "undefined") {
    throw new Error("DocumentObserver not providerd");
  }
  return documentObserver;
};

export default useDocumentObserver;
