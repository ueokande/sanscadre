import React from "react";
import AppContext from "./AppContext";
import styled from "styled-components";

const Container = styled.div`
  width: 640px;
  height: 480px;
  font-size: 96px;
  text-align: center;
  background-color: #ff00ff;
`;

const Screen = () => {
  const { state } = React.useContext(AppContext);
  const currentPage = state.pages[state.index];
  if (!currentPage) {
    return null;
  }

  return (
    <Container>
      { currentPage }
    </Container>
  );
};
export default Screen;
