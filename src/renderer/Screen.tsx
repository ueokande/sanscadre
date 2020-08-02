import React from "react";
import AppContext from "./AppContext";
import styled from "styled-components";
import * as ipc from "./ipc";
import PDFReader from "./PDFReader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFileVideo,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: black;
  user-select: none;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Video = styled.video`
  pointer-event: none;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const DropArea = styled.div`
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

const Screen = () => {
  const { state, dispatch } = React.useContext(AppContext);

  const content = (() => {
    const page = state.pages[state.active];
    if (!page) {
      return (
        <DropArea>
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
        </DropArea>
      );
    }
    if (page.type.startsWith("image/")) {
      return <Img src={page.src} />;
    } else if (page.type.startsWith("video/")) {
      return <Video src={page.src} autoPlay loop />;
    }
    return null;
  })();

  const preventDefaults = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const appendFile = (e: React.DragEvent) => {
    preventDefaults(e);

    Array.from(e.dataTransfer.files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        dispatch({
          type: "APPEND_PAGE",
          src: `file://${file.path}`,
          contentType: file.type,
        });
      } else if (file.type === "application/pdf") {
        (async () => {
          const pdf = await PDFReader.loadURL(`file://${file.path}`);
          pdf.eachPage(async (page) => {
            const png = await page.getPNG({ width: 1920 });
            const p = await ipc.saveTempFile(png, ".png");
            dispatch({
              type: "APPEND_PAGE",
              src: `file://${p}`,
              contentType: "image/png",
            });
          });
        })();
      }
    });
  };

  return (
    <Container
      onDragStart={preventDefaults}
      onDragOver={preventDefaults}
      onDragLeave={preventDefaults}
      onDrop={appendFile}
    >
      {content}
    </Container>
  );
};
export default Screen;
