import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const LeftContainer = styled.div<{
  shown: boolean;
  width: number;
  minWidth: number;
}>`
  display: ${({ shown }) => (shown ? "block" : "none")};
  flex-grow: 0;
  transition-duration: ${({ width, minWidth }) =>
    width <= minWidth ? "0.1s" : "0"};
  overflow-x: hidden;
  height: 100%;
  max-width: ${({ width }) => width + "px"};
  min-width: ${({ width }) => width + "px"};
`;
const RightContainer = styled.div`
  flex-grow: 1;
`;
const LeftContainerInner = styled.div<{ minWidth: number }>`
  min-width: ${({ minWidth }) => minWidth + "px"};
  height: 100%;
`;

const Splitter = styled.div<{ shown: boolean }>`
  display: ${({ shown }) => (shown ? "block" : "none")};
  width: 6px;
  border-left: 1px solid #a0a0a0;
  border-right: 1px solid #a0a0a0;
  background-color: #e0e0e0;
  cursor: col-resize;
  user-select: none;
`;

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  leftShown: boolean;
  leftWidth: number;
  minLeftWidth: number;
  onResized: (width: number) => void;
}

const VerticalSplitter: React.FC<Props> = ({
  left,
  right,
  leftShown,
  leftWidth,
  minLeftWidth,
  onResized,
}) => {
  const [tmpLeftWidth, setTmpLeftWidth] = React.useState(leftWidth);
  const [resizing, setResizing] = React.useState(false);
  const startResize = (e: React.PointerEvent) => {
    splitter.current?.setPointerCapture(e.pointerId);
    setResizing(true);
  };
  const stopResize = (e: React.PointerEvent) => {
    splitter.current?.releasePointerCapture(e.pointerId);
    setResizing(false);
    onResized(tmpLeftWidth);
  };
  const doResize = (e: React.PointerEvent) => {
    if (!resizing) {
      return;
    }
    if (container.current === null) {
      return;
    }
    let width = Math.max(
      e.pageX - container.current.getBoundingClientRect().left - 3,
      0
    );
    if (width !== 0) {
      width = Math.max(minLeftWidth, width);
    }
    setTmpLeftWidth(width);
  };
  const collapseLeft = () => {
    onResized(0);
  };

  const container = React.createRef<HTMLDivElement>();
  const splitter = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    setTmpLeftWidth(leftWidth);
  }, [leftWidth]);

  return (
    <Container ref={container}>
      <LeftContainer
        shown={leftShown}
        width={tmpLeftWidth}
        minWidth={minLeftWidth}
      >
        <LeftContainerInner minWidth={minLeftWidth}>{left}</LeftContainerInner>
      </LeftContainer>
      <Splitter
        ref={splitter}
        shown={leftShown}
        onPointerDown={startResize}
        onPointerMove={doResize}
        onPointerUp={stopResize}
        onDoubleClick={collapseLeft}
      />
      <RightContainer>{right}</RightContainer>
    </Container>
  );
};

export default VerticalSplitter;
