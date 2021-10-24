import WindowsProvider from "../WindowsProvider";

export default interface DocumentNotifier {
  notifyPageUpdated(pageIds: string[]): Promise<void>;
}

export class DocumentNotifierImpl implements DocumentNotifier {
  constructor(private readonly windowsProvider: WindowsProvider) {}

  async notifyPageUpdated(pageIds: string[]): Promise<void> {
    const promises = this.windowsProvider.getWindows().map((w) => {
      return w.webContents.postMessage("document-notification", {
        type: "on.pages-updated",
        pageIds,
      });
    });
    await Promise.all(promises);
  }
}
