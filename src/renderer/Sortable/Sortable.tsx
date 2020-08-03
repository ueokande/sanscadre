import React from "react";
import Rect from "./Rect";
import SortableItem from "./SortableItem";

interface Props {
  onSortEnd?: (index: number, insertBefore: number) => void;
}

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
          const offset = this.offsetOfElement(index);
          return (
            <SortableItem
              draggable
              dragging={this.state.dragging}
              offset={offset}
              key={index}
              onDragStart={(e) => this.dragStart(e, index)}
              onDragEnd={this.dragEnd.bind(this)}
            >
              {child}
            </SortableItem>
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

  private offsetOfElement(index: number) {
    const { draggingIndex, insertBefore } = this.state;
    if (draggingIndex < insertBefore) {
      if (index === draggingIndex) {
        return this.elemRects
          .slice(draggingIndex + 1, insertBefore)
          .reduce((sum, rect) => sum + rect.height, 0);
      } else if (draggingIndex < index && index < insertBefore) {
        return -this.elemRects[draggingIndex].height;
      }
    } else {
      if (index === draggingIndex) {
        return -this.elemRects
          .slice(insertBefore, draggingIndex)
          .reduce((sum, rect) => sum + rect.height, 0);
      } else if (insertBefore <= index && index < draggingIndex) {
        return this.elemRects[draggingIndex].height;
      }
    }
    return 0;
  }

  private dragOver(e: React.DragEvent<Element>) {
    if (this.props.children === null || this.container.current == null) {
      return;
    }
    if (!this.state.dragging) {
      return
    }

    let insertBefore = -1;
    const parentRect = this.container.current.getBoundingClientRect();
    const cursorY = e.clientY - parentRect.top;

    const elemenbTop =
      cursorY -
      (this.initCursorY - this.elemRects[this.state.draggingIndex].top);
    const currentElemBottom =
      elemenbTop + this.elemRects[this.state.draggingIndex].height - 1;

    if (currentElemBottom > this.elemRects[this.elemRects.length - 1].bottom) {
      insertBefore = this.elemRects.length;
    } else if (this.initCursorY > cursorY) {
      insertBefore = this.elemRects.findIndex(({ top }) => elemenbTop < top);
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
    if (!this.state.dragging) {
      return
    }
    this.setState({
      dragging: false,
    });
    this.props.onSortEnd &&
      this.props.onSortEnd(this.state.draggingIndex, this.state.insertBefore);
  }
}

export default Sortable;
