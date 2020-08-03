import React from "react";
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

interface Props {
  src?: string;
  type?: string;
}

const Screen: React.FC<Props> = ({ src, type }) => {
  const content = (() => {
    if (!src) {
      return <DropArea />;
    }
    if (type?.startsWith("image/")) {
      return <Img src={src} />;
    } else if (type?.startsWith("video/")) {
      return <Video src={src} autoPlay loop />;
    }
    return null;
  })();

  return <Container>{content}</Container>;
};
export default Screen;
