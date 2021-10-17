import { ipcRenderer } from "electron";

type OnCurrentPageChangedCallback = (page: number) => void;

export default class CursorObserver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onCurrentPageChangedCallback: OnCurrentPageChangedCallback = () => {};

  constructor() {
    ipcRenderer.on("cursor-notification", (event, msg) => {
      switch (msg.type) {
        case "on.cursor-changed":
          this.onCurrentPageChangedCallback(msg.page);
      }
    });
  }

  async onCurrentPageChanged(
    callback: OnCurrentPageChangedCallback
  ): Promise<void> {
    this.onCurrentPageChangedCallback = callback;
  }
}
