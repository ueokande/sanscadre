import React from "react";
import AppContext from "../../AppContext";
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
  id?: string;
  onResize?: (width: number, height: number) => void;
}

type Content = {
  src: string;
  contentType: string;
};

const Screen: React.FC<Props> = ({ id, onResize }) => {
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

  const { documentClient } = React.useContext(AppContext);
  const [content, setContent] = React.useState<Content | undefined>();
  React.useEffect(() => {
    if (typeof id === "undefined") {
      return id;
    }
    documentClient?.getPageContent(id).then((page) => {
      setContent(page);
    });
  }, [id]);

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

  const inner = (() => {
    if (!id) {
      return <DropArea />;
    }
    if (content?.contentType?.startsWith("image/")) {
      return <Img src={content.src} />;
    } else if (content?.contentType?.startsWith("video/")) {
      return <Video src={content.src} autoPlay loop />;
    }
    return null;
  })();
  return <Container ref={container}>{inner}</Container>;
};

export default Screen;
