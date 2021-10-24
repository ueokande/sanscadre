import React from "react";
import styled from "styled-components";
import AppContext from "../AppContext";
import PageListItem from "./PageListItem";
import { isMac } from "../platform";
import Sortable from "./Sortable";
import useDocumentClient from "../../renderer/hooks/useDocumentClient";
import useCursorClient from "../../renderer/hooks/useCursorClient";

const Container = styled.ul`
  padding: 0;
  margin: 0;
  padding-top: 20px;
  background-color: #eee;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
`;

const PageList: React.FC = () => {
  const documentClient = useDocumentClient();
  const cursorClient = useCursorClient();

  const { state: appState, dispatch: appDispatch } =
    React.useContext(AppContext);
  const select = (e: React.MouseEvent, index: number) => {
    if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
      appDispatch({ type: "TOGGLE_SELECTED", index });
    } else if (e.shiftKey) {
      appDispatch({ type: "SELECT_RANGE", end: index });
    } else {
      cursorClient?.goAt(index);
    }
  };

  const activeItem = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    activeItem.current?.scrollIntoView({
      block: "nearest",
    });
  }, [appState]);

  const sortItems = (index: number, insertBefore: number) => {
    const pageId = appState.pages[index];
    documentClient?.movePage(pageId, insertBefore);
  };

  return (
    <Container>
      <Sortable onSortEnd={sortItems}>
        {appState.pages.map((id, index) => (
          <div
            ref={index === appState.active ? activeItem : null}
            key={id}
            onMouseDown={(e) => select(e, index)}
          >
            <PageListItem
              index={index}
              active={index === appState.active}
              selected={appState.selected.has(index)}
              id={id}
            />
          </div>
        ))}
      </Sortable>
    </Container>
  );
};

export default PageList;
