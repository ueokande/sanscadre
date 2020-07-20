import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Screen from "./Screen";
import PageList from "./PageList";
import KeyHandler from "./KeyHandler";
import VerticalSplitter from "./VerticalSplitter";
import UIContext from "./UIContext";
import UIReducer from "./UIReducer";

export const initialState = {
  index: 0,
  pages: [""],
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
  const [appState, appDispatch] = React.useReducer(AppReducer, initialState);
  const [uiState, uiDispatch] = React.useReducer(UIReducer, {
    showSidebar: true,
    sidebarWidth: 128,
  });
  const handleResize = (width: number) => {
    uiDispatch({ type: "SET_SIDEBAR_WIDTH", width });
  };
  const handleResizeEnd = (width: number) => {
    uiDispatch({ type: "SET_SIDEBAR_WIDTH", width });
    if (width === 0) {
      uiDispatch({ type: "HIDE_SIDEBAR" });
    }
  };

  return (
    <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
      <UIContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
        <KeyHandler target={window.document.documentElement} />
        <Layout>
          <LayoutSidebar
            style={{
              display: uiState.showSidebar ? "block" : "none",
              minWidth: `${uiState.sidebarWidth}px`,
              maxWidth: `${uiState.sidebarWidth}px`,
            }}
          >
            <PageList />
          </LayoutSidebar>
          <VerticalSplitter
            style={{ display: uiState.showSidebar ? "block" : "none" }}
            onResize={handleResize}
            onResizeEnd={handleResizeEnd}
            minWidth={64}
            maxWidth={512}
          />
          <LayoutMain>
            <Screen />
          </LayoutMain>
        </Layout>
      </UIContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
