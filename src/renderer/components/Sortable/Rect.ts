export default class Rect {
  public readonly x1: number;
  public readonly y1: number;
  public readonly x2: number;
  public readonly y2: number;

  constructor(opts: { x: number; y: number; width: number; height: number }) {
    this.x1 = opts.x;
    this.y1 = opts.y;
    this.x2 = opts.x + opts.width - 1;
    this.y2 = opts.y + opts.height - 1;
  }

  get left() {
    return this.x1;
  }

  get top() {
    return this.y1;
  }

  get right() {
    return this.x2;
  }

  get bottom() {
    return this.y2;
  }

  get width() {
    return this.x2 - this.x1 + 1;
  }

  get height() {
    return this.y2 - this.y1 + 1;
  }

  translated({ dx, dy }: { dx: number; dy: number }): Rect {
    return new Rect({
      x: this.left + dx,
      y: this.top + dy,
      width: this.width,
      height: this.height,
    });
  }
}
