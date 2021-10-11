import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

type EachPageFunc = (page: PDFPage) => void;

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export class PDFPage {
  private serializer = new XMLSerializer();

  constructor(private page: pdfjs.PDFPageProxy) {}

  /**
   * NOTE: getSVG() does not work currently
   */
  async getSVG({
    scale = 1.0,
    embedFonts = true,
  }: { scale?: number; embedFonts?: boolean } = {}): Promise<string> {
    const viewport = this.page.getViewport({ scale });
    const opList = await this.page.getOperatorList();
    const svgGfx = new pdfjs.SVGGraphics(this.page.commonObjs, this.page.objs);
    svgGfx.embedFonts = embedFonts;
    const dom = await svgGfx.getSVG(opList, viewport);
    return this.serializer.serializeToString(dom);
  }

  async getPNG(
    opts:
      | {
          width: number;
          height?: number;
        }
      | {
          width?: number;
          height: number;
        }
      | {
          scale: number;
        }
  ): Promise<Buffer> {
    let viewport = this.page.getViewport({ scale: 1 });
    const rate = viewport.width / viewport.height;

    let { width, height, scale } = viewport;
    if ("scale" in opts) {
      width = viewport.width * opts.scale;
      height = viewport.height * opts.scale;
      scale = opts.scale;
    } else if (opts.width !== undefined) {
      scale = opts.width / viewport.width;
      width = opts.width;
      height = opts.width / rate;
    } else if (opts.height !== undefined) {
      scale = opts.height / viewport.height;
      width = opts.height * rate;
      height = opts.height;
    }

    viewport = this.page.getViewport({ scale });

    const canvas = createCanvas(width, height);
    await this.page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    }).promise;

    const content = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob === null) {
          return reject(new Error("unable to convert the page to a PNG"));
        }
        resolve(blob.arrayBuffer());
      }, "image/png");
    });

    canvas.remove();

    return Buffer.from(content as ArrayBuffer);
  }

  get pageNumber(): number {
    return this.page.pageNumber;
  }
}

export default class PDFReader {
  private constructor(private doc: pdfjs.PDFDocumentProxy) {}

  static async loadURL(url: string): Promise<PDFReader> {
    const doc = await pdfjs.getDocument(url).promise;
    return new PDFReader(doc);
  }

  static async loadBuffer(content: Buffer): Promise<PDFReader> {
    const doc = await pdfjs.getDocument(content).promise;
    return new PDFReader(doc);
  }

  async eachPage(f: EachPageFunc) {
    for (let i = 1; i <= this.doc.numPages; ++i) {
      const page = await this.doc.getPage(i);
      await f(new PDFPage(page));
    }
  }
}
