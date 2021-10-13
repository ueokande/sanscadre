import React from "react";
import { State, Action } from "./AppReducer";
import DocumentClient from "./clients/DocumentClient";

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  documentClient?: DocumentClient;
}

const AppContext = React.createContext<ContextType>({
  state: {} as State,
  dispatch: () => ({}),
});

export default AppContext;
