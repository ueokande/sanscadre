import React from "react";
import AppContext from "./AppContext";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 96px;
  text-align: center;
  background-color: #ff00ff;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
`;

const Screen = () => {
  const { state } = React.useContext(AppContext);
  const currentPage = state.pages[state.index];
  if (!currentPage) {
    return null;
  }

  return (
    <Container>
      <Img src={`file://${currentPage}`} />
    </Container>
  );
};
export default Screen;
