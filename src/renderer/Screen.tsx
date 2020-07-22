import React from "react";
import AppContext from "./AppContext";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 96px;
  text-align: center;
  background-color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const Img = styled.img`
  pointer-event: none;
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
  const { state } = React.useContext(AppContext);
  const page = state.pages[state.index];
  if (!page) {
    return null;
  }

  const content = (() => {
    if (page.type.startsWith("image/")) {
      return <Img src={page.src} />;
    } else if (page.type.startsWith("video/")) {
      return <Video src={page.src} controls autoPlay loop />;
    } else {
      return null;
    }
  })();

  return <Container>{content}</Container>;
};
export default Screen;
