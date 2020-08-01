import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
  selected: boolean;
  index: number;
  src: string;
  type: string;
}

const Container = styled.li<{ active: boolean; selected: boolean }>`
  margin: 0;
  padding: 8px 12px;
  list-style: none;
  cursor: default;
  user-select: none;
  text-align: right;
  background-color: ${({ active, selected }) =>
    active ? "#377cf1" : selected ? "#c0d8f3" : "unset"};
`;

const PageNumber = styled.span`
  font-family: system-ui;
  font-weight: bold;
  margin-right: 0.2rem;
`;

const Img = styled.img`
  width: calc(100% - 1.5rem);
  box-shadow: 0 0 4px #222;
`;

const Video = styled.video`
  width: calc(100% - 1.5rem);
  box-shadow: 0 0 4px #222;
`;

const PageListItem: React.FC<Props> = ({
  active,
  selected,
  index,
  src,
  type,
}) => {
  const content = (() => {
    if (type.startsWith("image/")) {
      return <Img src={src} />;
    } else if (type.startsWith("video/")) {
      return <Video src={src} />;
    } else {
      return null;
    }
  })();

  return (
    <Container active={active} selected={selected}>
      <PageNumber>{index + 1}</PageNumber>
      {content}
    </Container>
  );
};

export default PageListItem;
