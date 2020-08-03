import React from "react";
import styled from "styled-components";
import DropArea from "./DropArea";

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

interface Props {
  src?: string;
  type?: string;
  onResize?: (width: number, height: number) => void;
}

class Screen extends React.Component<Props> {
  private container = React.createRef<HTMLDivElement>();

  private observer: ResizeObserver;

  constructor(props: Props) {
    super(props);

    this.observer = new ResizeObserver((entities) => {
      for (const entity of entities) {
        this.props.onResize &&
          this.props.onResize(
            entity.contentRect.width,
            entity.contentRect.height
          );
        break;
      }
    });
  }

  componentDidMount() {
    if (this.container.current === null) {
      return;
    }

    this.observer.observe(this.container.current, { box: "border-box" });
  }

  componentWillUnmount() {
    if (this.container.current === null) {
      return;
    }

    this.observer.unobserve(this.container.current);
  }

  render() {
    const content = (() => {
      if (!this.props.src) {
        return <DropArea />;
      }
      if (this.props.type?.startsWith("image/")) {
        return <Img src={this.props.src} />;
      } else if (this.props.type?.startsWith("video/")) {
        return <Video src={this.props.src} autoPlay loop />;
      }
      return null;
    })();
    return <Container ref={this.container}>{content}</Container>;
  }
}

export default Screen;
