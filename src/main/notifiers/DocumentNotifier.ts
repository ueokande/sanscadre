import { WebContents } from "electron";

export default interface DocumentNotifier {
  notifyPageUpdated(pageIds: string[]): Promise<void>;
}

export class DocumentNotifierImpl implements DocumentNotifier {
  constructor(private readonly contents: WebContents) {}

  async notifyPageUpdated(pageIds: string[]): Promise<void> {
    await this.contents.postMessage("document-notification", {
      type: "on.pages-updated",
      pageIds,
    });
  }
}