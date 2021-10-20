import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Container = styled.div<{
  size: number;
  enabled: boolean;
  hover: boolean;
}>`
  display: inline-block;

  background-color: ${({ hover }) => (hover ? "#c8c8c8" : "#bab9ba")};
  color: ${({ enabled }) => (enabled ? "#191919" : "#606060")};
  width: ${({ size }) => size}px;
  line-height: ${({ size }) => size}px;
  font-weight: bold;
  font-size: ${({ size }) => size * 0.6}px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  transition-duration: 0.2s;
  transition-property: background-color;
`;

interface Props {
  icon: IconProp;
  size: number;
  enabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const CircularIcon: React.FC<Props> = ({
  icon,
  enabled = true,
  size,
  onClick,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Container
      size={size}
      enabled={enabled}
      hover={enabled ? hovered : false}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FontAwesomeIcon icon={icon} />
    </Container>
  );
};

export default CircularIcon;
