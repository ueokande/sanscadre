const pdfjs = require("pdfjs-dist");
const pdfjsWorker = require("pdfjs-dist/build/pdf.worker.entry").default;

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type EachPageFunc = (page: PDFPage) => void;

type CanvasContext = {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
};

const factory = new (class CanvasFactory {
  create(width: number, height: number): CanvasContext {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d")!;
    return { canvas, context };
  }

  reset(canvasAndContext: CanvasContext, width: number, height: number) {
    const canvas = canvasAndContext.canvas;
    if (canvas === null) {
      throw new Error("canvas not initialized");
    }
    canvas.width = width;
    canvas.height = height;
  }

  destroy(canvasAndContext: CanvasContext) {
    if (canvasAndContext.canvas === null) {
      throw new Error("canvas not initialized");
    }
    canvasAndContext.canvas!.remove();
    canvasAndContext.canvas!.width = 0;
    canvasAndContext.canvas!.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
})();

export class PDFPage {
  private serializer = new XMLSerializer();

  constructor(private page: any) {}

  /**
   * NOTE: getSVG() does not work currently
   */
  async getSVG({
    scale = 1.0,
    embedFonts = true,
  }: { scale?: number; embedFonts?: boolean } = {}): Promise<string> {
    const viewport = this.page.getViewport({ scale });
    const opList = await (this.page as any).getOperatorList();
    const svgGfx = new pdfjs.SVGGraphics(
      (this.page as any).commonObjs,
      (this.page as any).objs
    );
    svgGfx.embedFonts = embedFonts;
    const dom = await svgGfx.getSVG(opList, viewport);
    return this.serializer.serializeToString(dom);
  }

  async getPNG({
    scale,
    width,
    height,
  }: {
    scale?: number;
    width?: number;
    height?: number;
  }): Promise<Buffer> {
    if (scale === undefined && width === undefined && height === undefined) {
      throw new Error("invalid png size or scale");
    }

    let viewport = this.page.getViewport({ scale: 1 });
    const rate = viewport.width / viewport.height;
    if (width === null && height === null) {
      width = viewport.width;
      height = viewport.height;
      scale = viewport.scale;
    } else if (width !== undefined && height === undefined) {
      height = width! / rate;
      scale = width / viewport.width;
    } else if (width === undefined && height !== undefined) {
      width = height! * rate;
      scale = height / viewport.height;
    }
    viewport = this.page.getViewport({ scale });

    const canvas = factory.create(width!, height!);
    await this.page.render({
      canvasContext: canvas.context,
      viewport: viewport,
      canvasFactory: factory,
    }).promise;

    const content = await new Promise((resolve) => {
      canvas.canvas!.toBlob((blob) => {
        resolve(blob!.arrayBuffer());
      }, "image/png");
    });

    factory.destroy(canvas);

    return Buffer.from(content as ArrayBuffer);
  }

  get pageNumber(): number {
    return this.page.pageNumber;
  }
}

export default class PDFReader {
  constructor(private doc: any) {}

  static async loadURL(url: string): Promise<PDFReader> {
    const doc = await pdfjs.getDocument({
      url,
    }).promise;
    return new PDFReader(doc);
  }

  static async loadBuffer(content: Buffer): Promise<PDFReader> {
    const doc = await pdfjs.getDocument({
      data: content,
    }).promise;
    return new PDFReader(doc);
  }

  async eachPage(f: EachPageFunc) {
    for (let i = 1; i <= this.doc.numPages; ++i) {
      const page = await this.doc.getPage(i);
      await f(new PDFPage(page));
    }
  }
}
