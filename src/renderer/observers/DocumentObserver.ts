import { ipcRenderer } from "electron";

type OnPagesChangedCallback = (pageIds: string[]) => void;

export default class CursorObserver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onPagesChangedCallback: OnPagesChangedCallback = () => {};

  constructor() {
    ipcRenderer.on("document-notification", (event, msg) => {
      switch (msg.type) {
        case "on.pages-updated":
          this.onPagesChangedCallback(msg.pageIds);
      }
    });
  }

  async onPagesChanged(callback: OnPagesChangedCallback): Promise<void> {
    this.onPagesChangedCallback = callback;
  }
}
