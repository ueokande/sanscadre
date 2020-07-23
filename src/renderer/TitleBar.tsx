import React from "react";
import styled from "styled-components";

interface Props {
  shown: boolean;
  text: string;
}

const Container = styled.div<{ shown: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  line-height: 20px;
  font-family: system-ui;
  font-size: 13px;
  text-align: center;
  color: #eee;
  opacity: ${({ shown }) => (shown ? "1.0" : "0.0")};
  transition-property: opacity;
  transition-duration: 0.25s;
  background: #3f3f3f;
  -webkit-app-region: drag;
  text-align: center;
  user-select: none;
`;

const TitleBar: React.FC<Props> = ({ shown, text }: Props) => {
  return <Container shown={shown}>{text}</Container>;
};

export default TitleBar;
