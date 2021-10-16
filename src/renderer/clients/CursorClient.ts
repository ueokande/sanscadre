import { ipcRenderer } from "electron";

export default class CursorClient {
  goNext(): Promise<number> {
    return this.invoke({ type: "goNext" });
  }

  goPrev(): Promise<number> {
    return this.invoke({ type: "goPrev" });
  }

  goFirst(): Promise<number> {
    return this.invoke({ type: "goFirst" });
  }

  goLast(): Promise<number> {
    return this.invoke({ type: "goLast" });
  }

  goAt(index: number): Promise<number> {
    return this.invoke({ type: "goAt", index });
  }

  private invoke<T>(msg: unknown): Promise<T> {
    return ipcRenderer.invoke("cursor", msg);
  }
}
