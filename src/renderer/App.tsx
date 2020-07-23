import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Screen from "./Screen";
import PageList from "./PageList";
import KeyHandler from "./KeyHandler";
import VerticalSplit from "./VerticalSplit";
import UIContext from "./UIContext";
import UIReducer from "./UIReducer";
import TitleBar from "./TitleBar";
import SidebarKnob from "./SidebarKnob";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const initialState = {
  index: 0,
  pages: [],
};

const App = () => {
  const [appState, appDispatch] = React.useReducer(AppReducer, initialState);
  const [uiState, uiDispatch] = React.useReducer(UIReducer, {
    showSidebar: true,
    sidebarWidth: 128,
  });
  const handleKnobClicked = () => {
    uiDispatch({ type: "SHOW_SIDEBAR", width: 128 });
  };

  const [showTitleBar, setShowTitleBar] = React.useState(false);
  const [showKnob, setShowKnob] = React.useState(false);
  const showSidebarKnob = () => {
    setShowKnob(true && !uiState.showSidebar);
    setShowTitleBar(true);
  };
  const hideSidebarKnob = function () {
    setShowKnob(false);
    setShowTitleBar(false);
  };
  const handleSidebarResized = (width: number) => {
    uiDispatch({ type: "SET_SIDEBAR_WIDTH", width });
    if (width === 0) {
      uiDispatch({ type: "HIDE_SIDEBAR" });
    }
  };

  React.useEffect(() => {
    setShowKnob(true && !uiState.showSidebar);
  }, [uiState]);

  return (
    <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
      <UIContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
        <Container
          onMouseEnter={showSidebarKnob}
          onMouseLeave={hideSidebarKnob}
        >
          <TitleBar shown={showTitleBar} text={"Sanscadre"} />
          <VerticalSplit
            left={<PageList />}
            right={<Screen />}
            leftShown={uiState.showSidebar}
            leftWidth={uiState.sidebarWidth}
            onResized={handleSidebarResized}
          />
          <SidebarKnob shown={showKnob} onClick={handleKnobClicked} />
        </Container>
        <KeyHandler target={window.document.documentElement} />
      </UIContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
