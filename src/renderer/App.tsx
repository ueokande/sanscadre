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
import PDFReader from "./PDFReader";
import * as ipc from "./ipc";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const initialState = {
  active: 0,
  selected: new Set<number>(),
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

  const preventDefaults = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const appendFile = (e: React.DragEvent) => {
    preventDefaults(e);

    Array.from(e.dataTransfer.files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        appDispatch({
          type: "APPEND_PAGE",
          src: `file://${file.path}`,
          contentType: file.type,
        });
      } else if (file.type === "application/pdf") {
        (async () => {
          const pdf = await PDFReader.loadURL(`file://${file.path}`);
          pdf.eachPage(async (page) => {
            const png = await page.getPNG({ width: 1920 });
            const p = await ipc.saveTempFile(png, ".png");
            appDispatch({
              type: "APPEND_PAGE",
              src: `file://${p}`,
              contentType: "image/png",
            });
          });
        })();
      }
    });
  };

  const currentPage = appState.pages[appState.active];

  return (
    <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
      <UIContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
        <Container
          onMouseEnter={showSidebarKnob}
          onMouseLeave={hideSidebarKnob}
          onDragOver={preventDefaults}
          onDrop={appendFile}
        >
          <VerticalSplit
            left={<PageList />}
            right={<Screen src={currentPage?.src} type={currentPage?.type} />}
            leftShown={uiState.showSidebar}
            leftWidth={uiState.sidebarWidth}
            minLeftWidth={80}
            onResized={handleSidebarResized}
          />
          <SidebarKnob shown={showKnob} onClick={handleKnobClicked} />
          <TitleBar shown={showTitleBar} text={"Sanscadre"} />
        </Container>
        <KeyHandler target={window.document.documentElement} />
      </UIContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
