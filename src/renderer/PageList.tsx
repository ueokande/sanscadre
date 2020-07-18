import React from "react";
import AppContext from "./AppContext";
import styled from "styled-components";

const Container = styled.ul`
  padding: 0;
  margin: 0;
`;

const PageListItem = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PageList: React.FC = () => {
  const { state } = React.useContext(AppContext);

  return (
    <Container>
      {state.pages.map((text, index) => (
        <PageListItem key={index}>{text}</PageListItem>
      ))}
    </Container>
  );
};

export default PageList;
