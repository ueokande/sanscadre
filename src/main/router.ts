import { ipcMain } from "electron";
import DocumentUseCase from "./usecases/DocumentUseCase";

export default class Router {
  constructor(private readonly documentUseCase: DocumentUseCase) {}

  run() {
    ipcMain.handle("document", (event, msg) => {
      switch (msg.type) {
        case "append":
          return this.documentUseCase.append(msg.src, msg.contentType);
        case "remove":
          return this.documentUseCase.remove(msg.pageIds);
        case "move":
          return this.documentUseCase.movePage(msg.pageId, msg.insertBefore);
        case "getPageIds":
          return this.documentUseCase.getPageIds();
        case "get":
          return this.documentUseCase.getContent(msg.index);
      }
    });
  }
}
