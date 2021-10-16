import React from "react";
import { State, Action } from "./AppReducer";
import DocumentClient from "./clients/DocumentClient";
import CursorClient from "./clients/CursorClient";

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  documentClient?: DocumentClient;
  cursorClient?: CursorClient;
}

const AppContext = React.createContext<ContextType>({
  state: {} as State,
  dispatch: () => ({}),
});

export default AppContext;
