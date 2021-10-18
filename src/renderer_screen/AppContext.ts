import React from "react";
import { State, Action } from "./AppReducer";

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = React.createContext<ContextType>({
  state: {} as State,
  dispatch: () => ({}),
});

export default AppContext;
