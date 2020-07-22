import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div<{ shown: boolean }>`
  position: absolute;
  left: 0;
  bottom: 8px;
  display: inline-block;

  background-color: #191919;
  color: #bab9ba;
  width: 32px;
  line-height: 32px;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 0 50% 50% 0;
  text-align: center;
  cursor: pointer;

  opacity: ${({ shown }) => (shown ? "1.0" : "0.0")};
  transition-property: opacity;
  transition-duration: 0.5s;
`;

interface Props {
  shown: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const SidebarKnob: React.FC<Props> = ({ shown, onClick }: Props) => {
  return (
    <Container shown={shown} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </Container>
  );
};

export default SidebarKnob;
