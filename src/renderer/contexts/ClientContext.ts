import React from "react";
import CursorClient from "../clients/CursorClient";
import DocumentClient from "../clients/DocumentClient";

const ClientContext = React.createContext<{
  cursorClient?: CursorClient;
  documentClient?: DocumentClient;
}>({});

export default ClientContext;
