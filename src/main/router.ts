import { ipcMain } from "electron";
import DocumentUseCase from "./usecases/DocumentUseCase";
import CursorUseCase from "./usecases/CursorUseCase";

export default class Router {
  constructor(
    private readonly documentUseCase: DocumentUseCase,
    private readonly cursorUseCase: CursorUseCase
  ) {}

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

    ipcMain.handle("cursor", (event, msg) => {
      switch (msg.type) {
        case "goNext":
          return this.cursorUseCase.goNext();
        case "goPrev":
          return this.cursorUseCase.goPrev();
        case "goFirst":
          return this.cursorUseCase.goFirst();
        case "goLast":
          return this.cursorUseCase.goLast();
        case "goAt":
          return this.cursorUseCase.goAt(msg.index);
      }
    });
  }
}
