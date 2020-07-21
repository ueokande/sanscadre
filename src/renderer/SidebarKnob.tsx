import React from "react";
import UIContext from "./UIContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
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

  transition-property: opacity;
  transition-duration: 0.5s;
`;

interface Props {
  opacity: number;
}

const SidebarKnob: React.FC<Props> = ({ opacity }: Props) => {
  const { state, dispatch } = React.useContext(UIContext);
  const handleClick = () => {
    dispatch({ type: "SHOW_SIDEBAR", width: 128 });
  };

  return (
    <Container
      style={{
        display: state.showSidebar ? "none" : "block",
        opacity: opacity,
      }}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </Container>
  );
};

export default SidebarKnob;
