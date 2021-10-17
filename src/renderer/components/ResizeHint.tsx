import React from "react";
import styled from "styled-components";

const Container = styled.div<{ shown: boolean }>`
   {
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: ${({ shown }) => (shown ? "1" : "0")};
    transition-duration: 0.2s;
    background-color: #000000a0;
    color: white;
    font-family: system-ui;
    padding: 0.2rem 0.4rem;
  }
`;

interface Props {
  width: number;
  height: number;
  shown: boolean;
}

const ResizeHint: React.FC<Props> = ({ width, height, shown }) => {
  return (
    <Container shown={shown}>
      {Math.ceil(width)}px &#215; {Math.ceil(height)}px
    </Container>
  );
};

export default ResizeHint;
