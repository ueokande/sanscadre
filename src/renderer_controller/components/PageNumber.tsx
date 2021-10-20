import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  color: #1919191;
  font-weight: bold;
  width: 4rem;
  font-family: sans;
  text-align: center;
  align-self: center;
`;

interface Props {
  nan: boolean;
  current: number;
  total: number;
}

const CircularIcon: React.FC<Props> = ({ nan, current, total }) => {
  return <Container>{nan ? "-" : `${current}/${total}`}</Container>;
};

export default CircularIcon;
