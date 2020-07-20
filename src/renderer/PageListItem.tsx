import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
  index: number;
  label: string;
  src: string;
}

const Container = styled.li`
  margin: 0;
  padding: 8px 12px;
  list-style: none;
  cursor: default;
  user-select: none;
  text-align: right;
`;

const PageNumber = styled.span`
  font-family: helvetica, sans-serif;
  margin-right: 0.2rem;
`;

const Img = styled.img`
  width: calc(100% - 1.5rem);
  box-shadow: 0 0 4px #222;
`;

const PageListItem: React.FC<Props> = ({
  active,
  index,
  label,
  src,
}: Props) => {
  const highlightStyle = active ? { backgroundColor: "#377cf1" } : {};

  return (
    <Container style={highlightStyle}>
      <PageNumber>{index + 1}</PageNumber>
      <Img alt={label} src={src} />
    </Container>
  );
};

export default PageListItem;
