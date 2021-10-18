import React from "react";
import CursorClient from "../clients/CursorClient";
import ClientContext from "../contexts/ClientContext";

const useCursorClient = (): CursorClient => {
  const { cursorClient } = React.useContext(ClientContext);
  if (typeof cursorClient === "undefined") {
    throw new Error("CursorClient not providerd");
  }
  return cursorClient;
};

export default useCursorClient;
