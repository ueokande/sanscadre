import React from "react";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Screen from "./Screen";
import ControlPanel from "./ControlPanel";
import PageList from "./PageList";

const initialState = {
  index: 0,
  pages: ["hello", "world", "good", "morning"],
};

const App = () => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Screen />
      <ControlPanel />
      <PageList />
    </AppContext.Provider>
  );
};

export default App;
