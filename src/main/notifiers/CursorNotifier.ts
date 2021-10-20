import { WebContents } from "electron";

export default interface CursorNotifier {
  notifyCursorChanged(page: number): Promise<void>;
}

export class CursorNotifierImpl implements CursorNotifier {
  constructor(private readonly contents: WebContents) {}

  async notifyCursorChanged(page: number) {
    await this.contents.postMessage("cursor-notification", {
      type: "on.cursor-changed",
      page,
    });
  }
}

export class CursorNotifierChain implements CursorNotifier {
  constructor(private readonly notifiers: CursorNotifier[]) {}

  async notifyCursorChanged(page: number) {
    for (const n of this.notifiers) {
      await n.notifyCursorChanged(page);
    }
  }
}
