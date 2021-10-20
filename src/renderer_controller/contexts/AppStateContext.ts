import React from "react";

type State = {
  active: number;
  pageIds: string[];
};

const AppStateContext = React.createContext<State>({
  active: 0,
  pageIds: [],
});

export default AppStateContext;
