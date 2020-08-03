import React from "react";
import AppContext from "../AppContext";
import styled from "styled-components";
import DropArea from "./DropArea";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: black;
  user-select: none;
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
  const { state } = React.useContext(AppContext);

  const content = (() => {
    const page = state.pages[state.active];
    if (!page) {
      return <DropArea />;
    }
    if (page.type.startsWith("image/")) {
      return <Img src={page.src} />;
    } else if (page.type.startsWith("video/")) {
      return <Video src={page.src} autoPlay loop />;
    }
    return null;
  })();

  return <Container>{content}</Container>;
};
export default Screen;
