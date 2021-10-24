import React from "react";
import { State, Action } from "./UIReducer";

interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const UIContext = React.createContext<ContextType>({
  state: {} as State,
  dispatch: () => ({}),
});

export default UIContext;
