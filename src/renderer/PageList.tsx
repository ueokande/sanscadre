import React from "react";
import styled from "styled-components";
import AppContext from "./AppContext";
import PageListItem from "./PageListItem";

interface Props {
}

const Container = styled.ul`
  padding: 0;
  margin: 0;
  background-color: #eee;
`;

const PageList: React.FC<Props> = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const jump = (index: number) => () =>
    dispatch({ type: "JUMP_TO_PAGE", index });
  return (
    <Container>
      {state.pages.map((text, index) => (
        <PageListItem
          key={index}
          onClick={jump(index)}
          active={index === state.index}
          label={text}
        />
      ))}
    </Container>
  );
};

export default PageList;
