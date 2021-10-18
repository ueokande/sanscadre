import React from "react";

interface Props {
  dragging: boolean;
  offset: number;
}

const Item: React.FC<React.HTMLAttributes<HTMLElement> & Props> = ({
  children,
  dragging,
  offset,
  onDragStart,
  onDragEnd,
}) => {
  const style: React.CSSProperties = {};
  if (dragging) {
    style.transitionDuration = "0.1s";
    style.transform = `translateY(${offset}px)`;
  }
  return (
    <div style={style} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
    </div>
  );
};

export default Item;
