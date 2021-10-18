import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFileVideo,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

const DropAreaOuter = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  position: relative;
`;

const DropAreaInner = styled.div`
  position: absolute;
  left: 2rem;
  right: 2rem;
  top: 2rem;
  bottom: 2rem;
  border: 4px gray dashed;
  background-color: #f0f0f0;
  color: #606060;
  border-radius: 2rem;
  font-size: 4rem;
  font-family: sans-serif;
  font-weight: bold;
  display: flex;
  flex-flow: column;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
`;

const FontAwesomeZone = styled.div`
  font-size: 150%;
`;

const IconCenter = styled.span`
  font-size: 125%;
  margin: 0 1rem;
`;

const DropArea = () => (
  <DropAreaOuter>
    <DropAreaInner>
      <FontAwesomeZone>
        <FontAwesomeIcon icon={faFileImage} />
        <IconCenter>
          <FontAwesomeIcon icon={faFileVideo} />
        </IconCenter>
        <FontAwesomeIcon icon={faFilePdf} />
      </FontAwesomeZone>
      <div>{"Drop you files here"}</div>
    </DropAreaInner>
  </DropAreaOuter>
);

export default DropArea;
