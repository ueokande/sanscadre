import { ipcRenderer } from "electron";

type Page = {
  src: string;
  contentType: string;
};

export default class DocumentClient {
  append(src: string, contentType: string): Promise<string> {
    return this.invoke({ type: "append", src, contentType });
  }

  remove(pageIds: string[]) {
    return this.invoke({ type: "remove", pageIds });
  }

  movePage(pageId: string, insertBefore: number) {
    return this.invoke({ type: "move", pageId, insertBefore });
  }

  getPageIds(): Promise<string[]> {
    return this.invoke({ type: "getPageIds" });
  }

  getPageContent(index: string): Promise<Page> {
    return this.invoke({ type: "get", index });
  }

  private invoke<T>(msg: unknown): Promise<T> {
    return ipcRenderer.invoke("document", msg);
  }
}
