import React from "react";
import styled from "styled-components";
import useDocumentClient from "../../renderer/hooks/useDocumentClient";

interface Props {
  active: boolean;
  selected: boolean;
  index: number;
  id: string;
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

type Content = {
  src: string;
  contentType: string;
};

const PageListItem: React.FC<Props> = ({ active, selected, index, id }) => {
  const documentClient = useDocumentClient();
  const [content, setContent] = React.useState<Content | undefined>();
  React.useEffect(() => {
    documentClient?.getPageContent(id).then((page) => {
      setContent(page);
    });
  }, [id]);

  const inner = (() => {
    if (content?.contentType.startsWith("image/")) {
      return <Img src={content?.src} />;
    } else if (content?.contentType.startsWith("video/")) {
      return <Video src={content?.src} />;
    } else {
      return null;
    }
  })();

  return (
    <Container active={active} selected={selected}>
      <PageNumber>{index + 1}</PageNumber>
      {inner}
    </Container>
  );
};

export default PageListItem;
