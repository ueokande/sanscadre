import React from "react";
import styled from "styled-components";
import CircularIcon from "./components/CircularIcon";
import PageNumber from "./components/PageNumber";
import {
  faStepForward,
  faStepBackward,
  faFastForward,
  faFastBackward,
} from "@fortawesome/free-solid-svg-icons";
import AppStateContext from "./contexts/AppStateContext";
import useCursorClient from "../renderer/hooks/useCursorClient";
import useKeyboard from "./hooks/useKeyboard";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 24px 0;
`;

const App = () => {
  const { active, pageIds } = React.useContext(AppStateContext);
  const hasPrevPage = 0 < active;
  const hasNextPage = active < pageIds.length - 1;
  const cursorClient = useCursorClient();

  const onPrevPageClicked = React.useCallback(() => {
    cursorClient.goPrev();
  }, []);
  const onNextPageClicked = React.useCallback(() => {
    cursorClient.goNext();
  }, []);
  const onFirstPageClicked = React.useCallback(() => {
    cursorClient.goFirst();
  }, []);
  const onLastPageClicked = React.useCallback(() => {
    cursorClient.goLast();
  }, []);

  useKeyboard();

  return (
    <Container>
      <CircularIcon
        size={48}
        onClick={onFirstPageClicked}
        icon={faFastBackward}
      />
      <CircularIcon
        enabled={hasPrevPage}
        onClick={onPrevPageClicked}
        size={96}
        icon={faStepBackward}
      />
      <PageNumber
        nan={pageIds.length === 0}
        current={active + 1}
        total={pageIds.length}
      />
      <CircularIcon
        enabled={hasNextPage}
        onClick={onNextPageClicked}
        size={96}
        icon={faStepForward}
      />
      <CircularIcon
        size={48}
        onClick={onLastPageClicked}
        icon={faFastForward}
      />
    </Container>
  );
};

export default App;
