declare module "pdfjs-dist" {
  interface GlobalWorkerOptions {
    workerSrc: string;
  }

  declare const GlobalWorkerOptions: GlobalWorkerOptions;

  declare type DocumentInitParameters = {
    url: string;
    data: Array<T> | string;
    httpHeaders: unknown;
    withCredentials: boolean;
    password: string;
    initialData: Array<T>;
    length: number;
    range: PDFDataRangeTransport;
    rangeChunkSize: number;
    worker: PDFWorker;
    verbosity: number;
    docBaseUrl: string;
    cMapUrl: string;
    cMapPacked: boolean;
    CMapReaderFactory: unknown;
    stopAtErrors: boolean;
    maxImageSize: number;
    isEvalSupported: boolean;
    disableFontFace: boolean;
    fontExtraProperties: boolean;
    disableRange: boolean;
    disableStream: boolean;
    disableAutoFetch: boolean;
    pdfBug: boolean;
  };

  declare function getDocument<T>(
    src:
      | string
      | Array<T>
      | DocumentInitParameters<T>
      | PDFDataRangeTransport<T>
  ): PDFDocumentLoadingTask;

  declare class PDFDocumentLoadingTask {
    readonly promise: Promise<PDFDocumentProxy>;
  }

  declare class PDFDocumentProxy {
    public readonly numPages: number;

    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  declare type PageViewport = {
    viewBox: Array<number>;
    scale: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
    dontFlip: boolean;
    width: number;
    height: number;
  };

  declare type GetViewportParameters = {
    scale: number;
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
    dontFlip: boolean;
  };

  declare type PDFOperatorList = {
    fnArray: Array<unknown>;
    argsArray: Array<unknown>;
  };

  declare type RenderParameters = {
    canvasContext: unknown;
    viewport: PageViewport;
    intent?: string;
    enableWebGL?: boolean;
    renderInteractiveForms?: boolean;
    transform?: Array<number>;
    imageLayer?: unknown;
    canvasFactory?: unknown;
    background?: unknown;
  };

  declare class RenderTask {
    public readonly promise: Promise<>;
  }

  declare class PDFPageProxy {
    public readonly commonObjs: unknown;

    public readonly objs: unknown;

    public readonly pageNumber;

    public readonly rotate: number;

    getViewport(GetViewportParameters): PageViewport;

    getOperatorList(): Promise<PDFOperatorList>;

    render(RenderParameters): RenderTask;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  declare class SVGGraphics {
    public embedFonts: boolean;

    constructor(commonObjs: unknown, objs: unknown, forceDataSchema?: boolean);

    getSVG(opList, viewport);
  }
}

declare module "pdfjs-dist/build/pdf.worker.entry";
