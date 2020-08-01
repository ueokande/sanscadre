import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const LeftContainer = styled.div<{ width: number; shown: boolean }>`
  display: ${({ shown }) => (shown ? "block" : "none")};
  flex-grow: 0;
  max-width: ${({ width }) => width + "px"};
  min-width: ${({ width }) => width + "px"};
`;
const RightContainer = styled.div`
  flex-grow: 1;
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
  onResized: (width: number) => void;
}

const VerticalSplitter: React.FC<Props> = ({
  left,
  right,
  leftShown,
  leftWidth,
  onResized,
}) => {
  const [leftWidthOnResizing, setLeftWidthOnResizing] = React.useState(
    leftWidth
  );
  const [resizing, setResizing] = React.useState(false);
  const startResize = (e: React.PointerEvent) => {
    splitter.current?.setPointerCapture(e.pointerId);
    setResizing(true);
  };
  const stopResize = (e: React.PointerEvent) => {
    splitter.current?.releasePointerCapture(e.pointerId);
    setResizing(false);
    onResized(leftWidthOnResizing);
  };
  const doResize = (e: React.PointerEvent) => {
    if (!resizing) {
      return;
    }
    if (container.current === null) {
      return;
    }
    const width = Math.max(
      e.pageX - container.current.getBoundingClientRect().left - 3,
      0
    );
    setLeftWidthOnResizing(width);
  };
  const collapseLeft = () => {
    onResized(0);
  };

  const container = React.createRef<HTMLDivElement>();
  const splitter = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    setLeftWidthOnResizing(leftWidth);
  }, [leftWidth]);

  return (
    <Container ref={container}>
      <LeftContainer shown={leftShown} width={leftWidthOnResizing}>
        {left}
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
