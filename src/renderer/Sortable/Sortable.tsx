import React from "react";
import Rect from "./Rect";

interface Props {
  onSortEnd?: (index: number, insertBefore: number) => void;
}

type MixedType = React.HTMLAttributes<HTMLElement> & {
  dragging: boolean;
  offset: number;
};
const Item: React.FC<MixedType> = ({
  children,
  dragging,
  offset,
  onDragStart,
  onDragEnd,
}: MixedType) => {
  const style: React.CSSProperties = {};
  if (dragging) {
    style.transitionDuration = "0.1s";
    style.transform = `translateY(${offset}px)`;
  }
  return (
    <div
      draggable
      style={style}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
};

interface State {
  dragging: boolean;
  draggingIndex: number;
  insertBefore: number;
}

class Sortable extends React.Component<Props, State> {
  private container = React.createRef<HTMLDivElement>();
  private elemRects = Array<Rect>();
  private initCursorY = 0;

  constructor(props: Props) {
    super(props);

    this.elemRects = new Array(React.Children.count(this.props.children)).fill({
      top: 0,
      bottom: 0,
    });

    this.state = {
      dragging: false,
      draggingIndex: 0,
      insertBefore: 0,
    };
  }

  updateRects() {
    if (this.container.current === null) {
      return;
    }
    const rectFromDom = (e: Element) => {
      const r = e.getBoundingClientRect();
      return new Rect({ x: r.x, y: r.y, width: r.width, height: r.height });
    };
    const parentRect = rectFromDom(this.container.current);
    const rects = Array.from(this.container.current.children).map((ele) =>
      rectFromDom(ele).translated({
        dx: -parentRect.left,
        dy: -parentRect.top,
      })
    );
    this.elemRects = rects;
  }

  render() {
    return (
      <div ref={this.container} onDragOver={(e) => this.dragOver(e)}>
        {React.Children.map(this.props.children, (child, index) => {
          let offset = 0;
          if (this.state.draggingIndex < this.state.insertBefore) {
            if (index === this.state.draggingIndex) {
              offset = this.elemRects
                .slice(this.state.draggingIndex + 1, this.state.insertBefore)
                .reduce((sum, rect) => sum + rect.height, 0);
            } else if (
              this.state.draggingIndex < index &&
              index < this.state.insertBefore
            ) {
              offset = -this.elemRects[this.state.draggingIndex].height;
            }
          } else {
            if (index === this.state.draggingIndex) {
              offset = -this.elemRects
                .slice(this.state.insertBefore, this.state.draggingIndex)
                .reduce((sum, rect) => sum + rect.height, 0);
            } else if (
              this.state.insertBefore <= index &&
              index < this.state.draggingIndex
            ) {
              offset = this.elemRects[this.state.draggingIndex].height;
            }
          }
          return (
            <Item
              draggable
              dragging={this.state.dragging}
              offset={offset}
              key={index}
              onDragStart={(e) => this.dragStart(e, index)}
              onDragEnd={this.dragEnd.bind(this)}
            >
              {child}
            </Item>
          );
        })}
      </div>
    );
  }

  private dragStart(e: React.DragEvent<Element>, index: number) {
    if (this.props.children === null || this.container.current == null) {
      return;
    }
    const parentRect = this.container.current.getBoundingClientRect();
    this.initCursorY = e.clientY - parentRect.top;
    this.setState({
      dragging: true,
      draggingIndex: index,
      insertBefore: index,
    });
    this.updateRects();
  }

  private dragOver(e: React.DragEvent<Element>) {
    if (this.props.children === null || this.container.current == null) {
      return;
    }

    let insertBefore = -1;
    const parentRect = this.container.current.getBoundingClientRect();
    const cursorY = e.clientY - parentRect.top;

    const currentElemTop =
      cursorY -
      (this.initCursorY - this.elemRects[this.state.draggingIndex].top);
    const currentElemBottom =
      currentElemTop + this.elemRects[this.state.draggingIndex].height;
    if (currentElemBottom > this.elemRects[this.elemRects.length - 1].bottom) {
      insertBefore = this.elemRects.length;
    } else if (this.initCursorY > cursorY) {
      insertBefore = this.elemRects.findIndex(
        ({ top }) => currentElemTop < top
      );
    } else {
      const index = this.elemRects
        .concat([])
        .reverse()
        .findIndex(({ top }) => currentElemBottom > top);
      insertBefore = this.elemRects.length - 1 - index;
    }
    this.setState({ insertBefore });
  }

  private dragEnd() {
    this.setState({
      dragging: false,
    });
    this.props.onSortEnd &&
      this.props.onSortEnd(this.state.draggingIndex, this.state.insertBefore);
  }
}

export default Sortable;
