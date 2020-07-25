import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import PageListItem from "./PageListItem";
import { initialState } from "./DraggableReducer";
import DraggableReducer from "./DraggableReducer";
import { isMac } from "./platform";

const Container = styled.ul`
  padding: 0;
  margin: 0;
  background-color: #eee;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
`;

const PageList: React.FC = () => {
  const { state: appState, dispatch: appDispatch } = React.useContext(
    AppContext
  );
  const [draggableState, draggableDispatch] = React.useReducer(
    DraggableReducer,
    initialState
  );

  const select = (e: React.MouseEvent, index: number) => {
    if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
      appDispatch({ type: "TOGGLE_SELECTED", index });
    } else if (e.shiftKey) {
      appDispatch({ type: "SELECT_RANGE", end: index });
    } else {
      appDispatch({ type: "JUMP_TO_PAGE", index });
    }
  };

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

    if (!draggableState.dragging) {
      return;
    }
    appDispatch({
      type: "MOVE_PAGE",
      insertBefore: draggableState.insertBefore,
    });
  };

  const isDragging = (index: number) =>
    draggableState.dragging && draggableState.draggingIndex === index;
  const isOver = (index: number) =>
    draggableState.dragging && draggableState.insertBefore === index;

  const activeItem = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    activeItem.current?.scrollIntoView({
      block: "nearest",
    });
  }, [appState]);

  return (
    <Container
      onDrop={handleDrop}
      onDragOver={(e) => handleDragOver(e, appState.pages.length)}
    >
      {appState.pages.map((page, index) => {
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
            ref={index === appState.active ? activeItem : null}
            key={index}
            onMouseDown={(e) => select(e, index)}
            onDragStart={() => dragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={() => dragEnd()}
            style={style}
          >
            <PageListItem
              key={index}
              index={index}
              active={index === appState.active}
              selected={appState.selected.has(index)}
              src={page.src}
              type={page.type}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default PageList;
