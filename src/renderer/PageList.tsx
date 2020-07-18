import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import PageListItem from "./PageListItem";

const Container = styled.ul`
  padding: 0;
  margin: 0;
  background-color: #eee;
  min-width: 160px;
  max-width: 160px;
`;

const PageList: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const jump = (index: number) => () =>
    dispatch({ type: "JUMP_TO_PAGE", index });

  return (
    <Container>
      {state.pages.map((path, index) => (
        <PageListItem
          key={index}
          onClick={jump(index)}
          active={index === state.index}
          label={path}
          src={`file://${path}`}
        />
      ))}
    </Container>
  );
};

export default PageList;
