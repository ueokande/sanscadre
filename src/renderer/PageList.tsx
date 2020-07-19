import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import PageListItem from "./PageListItem";
import { initialState } from "./DraggableReducer";
import DraggableReducer from "./DraggableReducer";

const Container = styled.ul`
  padding: 0;
  margin: 0;
  background-color: #eee;
  min-height: 100%;
`;

const PageList: React.FC = () => {
  const { state: appState, dispatch: appDispatch } = React.useContext(
    AppContext
  );
  const [draggableState, draggableDispatch] = React.useReducer(
    DraggableReducer,
    initialState
  );

  const jump = (index: number) => () =>
    appDispatch({ type: "JUMP_TO_PAGE", index });

  const dragStart = (index: number) => {
    draggableDispatch({ type: "DRAG_START", index });
  };
  const dragEnd = () => {
    draggableDispatch({ type: "DRAG_END" });
  };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    draggableDispatch({ type: "DRAG_OVER", insertBefore: index });
  };
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggableState.dragging) {
      appDispatch({
        type: "MOVE_PAGE",
        targetIndex: draggableState.draggingIndex,
        insertBefore: draggableState.insertBefore,
      });
      return;
    }
    Array.from(e.dataTransfer.files).forEach((file) => {
      appDispatch({ type: "APPEND_PAGE", path: file.path });
    });
  };

  const isDragging = (index: number) =>
    draggableState.dragging && draggableState.draggingIndex === index;
  const isOver = (index: number) =>
    draggableState.dragging && draggableState.insertBefore === index;

  return (
    <Container
      onDrop={handleDrop}
      onDragOver={(e) => handleDragOver(e, appState.pages.length)}
    >
      {appState.pages.map((path, index) => {
        let style: { [key: string]: string } = {
          transitionDuration: "0.25s",
          transitionProperty: "margin",
        };
        if (isDragging(index)) {
          style = { ...style, opacity: "0.5" };
        }
        if (isOver(index)) {
          style = { ...style, marginTop: "32px" };
        }

        return (
          <div
            draggable
            key={index}
            onClick={jump(index)}
            onDragStart={() => dragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={() => dragEnd()}
            style={style}
          >
            <PageListItem
              key={index}
              index={index}
              active={index === appState.index}
              label={path}
              src={`file://${path}`}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default PageList;
