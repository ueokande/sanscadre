import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
  label: string;
  onClick: () => void;
}

const Container = styled.li`
  width: 160px;
  height: 90px;
  padding: 0;
  margin: 16px;
  list-style: none;
  cursor: default;
  background-color: white;
  user-select: none;
`;

const PageListItem: React.FC<Props> = ({ active, label, onClick }: Props) => {
  const highlightStyle = active ? { boxShadow: "0 0 0 10px #c5c5c5" } : {};

  return (
    <Container style={highlightStyle} onClick={onClick}>
      {label}
    </Container>
  );
};

export default PageListItem;
