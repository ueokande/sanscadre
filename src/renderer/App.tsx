import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Screen from "./Screen";
import PageList from "./PageList";
import KeyHandler from "./KeyHandler";

const initialState = {
  index: 0,
  pages: ["hello", "world", "good", "morning"],
};

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const LayoutSidebar = styled.div`
  flex-grow: 0;
  overflow-y: auto;
  background-color: #f6f6f6;
`;

const LayoutMain = styled.div`
  flex-grow: 1;
`;

const App = () => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <KeyHandler target={window.document.documentElement} />
      <Layout>
        <LayoutSidebar>
          <PageList />
        </LayoutSidebar>
        <LayoutMain>
          <Screen />
        </LayoutMain>
      </Layout>
    </AppContext.Provider>
  );
};

export default App;
