import React from "react";
import AppContext from "./AppContext";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: black;
  user-select: none;
  -webkit-app-region: drag;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Video = styled.video`
  pointer-event: none;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Screen = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const content = (() => {
    const page = state.pages[state.index];
    if (!page) {
      return null;
    }
    if (page.type.startsWith("image/")) {
      return <Img src={page.src} />;
    } else if (page.type.startsWith("video/")) {
      return <Video src={page.src} controls autoPlay loop />;
    }
    return null;
  })();

  const preventDefaults = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const appendFile = (e: React.DragEvent) => {
    preventDefaults(e);

    Array.from(e.dataTransfer.files)
      .filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/")
      )
      .forEach((file) => {
        dispatch({
          type: "APPEND_PAGE",
          src: `file://${file.path}`,
          contentType: file.type,
        });
      });
  };

  return (
    <Container
      onDragStart={preventDefaults}
      onDragOver={preventDefaults}
      onDragLeave={preventDefaults}
      onDrop={appendFile}
    >
      {content}
    </Container>
  );
};
export default Screen;
