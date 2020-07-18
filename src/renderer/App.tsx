import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Screen from "./Screen";
import PageList from "./PageList";
import KeyHandler from "./KeyHandler";

const initialState = {
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
  const [state, dispatch] = React.useReducer(AppReducer, initialState);
  const handleDrag = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    Array.from(e.dataTransfer.files).forEach((file) => {
      dispatch({ type: "APPEND_PAGE", path: file.path });
    });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <KeyHandler target={window.document.documentElement} />
      <Layout>
        <LayoutSidebar
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
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
