import { WebContents } from "electron";

export default interface CursorNotifier {
  notifyCurrentPageChanged(page: number): Promise<void>;
}

export class CursorNotifierImpl implements CursorNotifier {
  constructor(private readonly contents: WebContents) {}

  async notifyCurrentPageChanged(page: number) {
    await this.contents.postMessage("cursor-notification", {
      type: "on.cursor-changed",
      page,
    });
  }
}
