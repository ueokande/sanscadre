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
  onResize?: (width: number, height: number) => void;
}

const Screen: React.FC<Props> = ({ src, type, onResize }) => {
  const container = React.createRef<HTMLDivElement>();

  const observer = React.useMemo(() => {
    return new ResizeObserver((entities) => {
      for (const entity of entities) {
        onResize &&
          onResize(entity.contentRect.width, entity.contentRect.height);
        break;
      }
    });
  }, []);

  React.useEffect(() => {
    if (container.current === null) {
      return;
    }
    observer.observe(container.current, { box: "border-box" });

    return () => {
      if (container.current === null) {
        return;
      }
      observer.unobserve(container.current);
    };
  }, [onResize, container]);

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
  return <Container ref={container}>{content}</Container>;
};

export default Screen;
