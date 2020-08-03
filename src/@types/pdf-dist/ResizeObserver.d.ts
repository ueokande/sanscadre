// Resize Observer - W3C First Public Working Draft
// https://www.w3.org/TR/resize-observer/

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);

  observe: (target: Element, options?: ResizeObserverOptions) => void;

  unobserve: (target: Element) => void;

  disconnect: () => void;
}

type ResizeObserverBoxOptions =
  | "border-box"
  | "content-box"
  | "device-pixel-content-box";

type ResizeObserverOptions = {
  box?: ResizeObserverBoxOptions;
};

type ResizeObserverCallback = (
  entries: Array<ResizeObserverEntry>,
  observer: ResizeObserver
) => void;

type ResizeObserverEntry = {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: Array<ResizeObserverSize>;
  readonly contentBoxSize: Array<ResizeObserverSize>;
  readonly devicePixelContentBoxSize: Array<ResizeObserverSize>;
};

type ResizeObserverSize = {
  readonly inlineSize: number;
  readonly blockSize: number;
};
