import React from "react";
import styled from "styled-components";

interface Props {
  active: boolean;
  index: number;
  src: string;
  type: string;
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

const Video = styled.video`
  width: calc(100% - 1.5rem);
  box-shadow: 0 0 4px #222;
`;

const PageListItem: React.FC<Props> = ({ active, index, src, type }: Props) => {
  const highlightStyle = active ? { backgroundColor: "#377cf1" } : {};
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
    <Container style={highlightStyle}>
      <PageNumber>{index + 1}</PageNumber>
      {content}
    </Container>
  );
};

export default PageListItem;
