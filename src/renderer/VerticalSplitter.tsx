import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 6px;
  border-left: 1px solid #a0a0a0;
  border-right: 1px solid #a0a0a0;
  background-color: #e0e0e0;
  cursor: col-resize;
`;

interface Props {
  style: React.CSSProperties;
  onResize: (width: number) => void;
  onResizeEnd: (width: number) => void;
  minWidth?: number;
  maxWidth?: number;
}

const VerticalSplitter: React.FC<Props> = ({
  style,
  onResize,
  onResizeEnd,
  minWidth = 0,
  maxWidth = Number.MAX_SAFE_INTEGER,
}: Props) => {
  const ref = React.createRef<HTMLDivElement>();
  const getWidth = (e: React.DragEvent) => {
    const parentElement = ref.current?.parentElement as HTMLElement | null;
    if (!parentElement) {
      return null;
    }

    let width = e.pageX - parentElement.getBoundingClientRect().left;
    width = Math.min(maxWidth, width);
    if (width < minWidth) {
      return 0;
    }
    return width;
  };

  const handleDrag = (e: React.DragEvent) => {
    const width = getWidth(e);
    if (width !== null) {
      onResize(width);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const width = getWidth(e);
    if (width !== null) {
      onResizeEnd(width);
    }
  };

  const handleDoubleClick = () => {
    onResizeEnd(0);
  };

  return (
    <Container
      ref={ref}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      style={style}
    />
  );
};

export default VerticalSplitter;
