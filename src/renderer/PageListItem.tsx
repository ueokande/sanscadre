import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
  label: string;
  onClick: () => void;
  src: string;
}

const Container = styled.li`
  padding: 0;
  margin: 16px;
  list-style: none;
  cursor: default;
  background-color: white;
  user-select: none;
`;

const Img = styled.img`
  min-height: 90px;
  max-height: 90px;
  min-width: 160px;
  max-width: 160px;
`;

const PageListItem: React.FC<Props> = ({
  active,
  label,
  src,
  onClick,
}: Props) => {
  const highlightStyle = active ? { boxShadow: "0 0 0 10px #c5c5c5" } : {};

  return (
    <Container style={highlightStyle} onClick={onClick}>
      <Img alt={label} src={src} />
    </Container>
  );
};

export default PageListItem;
