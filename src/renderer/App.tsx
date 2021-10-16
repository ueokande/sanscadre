import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Screen from "./components/Screen";
import PageList from "./components/PageList";
import KeyHandler from "./components/KeyHandler";
import VerticalSplit from "./components/VerticalSplit";
import UIContext from "./UIContext";
import UIReducer from "./UIReducer";
import ResizeHint from "./components/ResizeHint";
import TitleBar from "./components/TitleBar";
import SidebarKnob from "./components/SidebarKnob";
import PDFReader from "./PDFReader";
import ContextMenu from "./components/ContextMenu";
import DocumentClient from "./clients/DocumentClient";
import CursorClient from "./clients/CursorClient";
import DocumentObserver from "./observers/DocumentObserver";
import CursorObserver from "./observers/CursorObserver";

const documentClient = new DocumentClient();
const documentObserver = new DocumentObserver();
const cursorClient = new CursorClient();
const cursorObserver = new CursorObserver();

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
        (async () => {
          await documentClient.append(`file://${file.path}`, file.type);
        })();
      } else if (file.type === "application/pdf") {
        (async () => {
          const pdf = await PDFReader.loadURL(`file://${file.path}`);
          pdf.eachPage(async (page) => {
            const src = await page.getPNG({ width: 1920 });
            await documentClient.append(src, "image/png");
          });
        })();
      }
    });
  };

  const [hideHintTimer, setHideHintTimer] = React.useState<number>();
  const [hintWidth, setHintWidth] = React.useState(-1);
  const [hintHeight, setHintHeight] = React.useState(-1);
  const [hintShown, setHintShown] = React.useState(false);

  const updateResizeHint = (width: number, height: number) => {
    setHintWidth(width);
    setHintHeight(height);
    setHintShown(true);

    clearTimeout(hideHintTimer);
    const timer = setTimeout(() => {
      setHintShown(false);
    }, 500);
    setHideHintTimer(timer);
  };

  React.useEffect(() => {
    documentObserver.onPagesChanged((pageIds: string[]) => {
      appDispatch({ type: "SET_PAGES", pageIds });
    });
  }, [documentObserver]);

  React.useEffect(() => {
    cursorObserver.onCurrentPageChanged((index: number) => {
      appDispatch({ type: "SET_CURSOR", index });
      appDispatch({ type: "SELECT_RANGE", begin: index, end: index });
    });
  }, [cursorClient]);

  React.useEffect(() => {
    (async () => {
      const pageIds = await documentClient.getPageIds();
      appDispatch({ type: "SET_PAGES", pageIds });
    })();
  }, [documentClient]);

  return (
    <AppContext.Provider
      value={{
        state: appState,
        dispatch: appDispatch,
        documentClient,
        cursorClient,
      }}
    >
      <UIContext.Provider value={{ state: uiState, dispatch: uiDispatch }}>
        <ContextMenu />
        <Container
          onMouseEnter={showSidebarKnob}
          onMouseLeave={hideSidebarKnob}
          onDragOver={preventDefaults}
          onDrop={appendFile}
        >
          <VerticalSplit
            left={<PageList />}
            right={
              <Screen
                id={appState.pages[appState.active]}
                onResize={updateResizeHint}
              />
            }
            leftShown={uiState.showSidebar}
            leftWidth={uiState.sidebarWidth}
            minLeftWidth={80}
            onResized={handleSidebarResized}
          />
          <SidebarKnob shown={showKnob} onClick={handleKnobClicked} />
          <ResizeHint shown={hintShown} width={hintWidth} height={hintHeight} />
          <TitleBar shown={showTitleBar} text={"Sanscadre"} />
        </Container>
        <KeyHandler target={window.document.documentElement} />
      </UIContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
