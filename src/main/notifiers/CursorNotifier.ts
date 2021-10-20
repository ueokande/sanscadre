import WindowsProvider from "../WindowsProvider";

export default interface CursorNotifier {
  notifyCursorChanged(page: number): Promise<void>;
}

export class CursorNotifierImpl implements CursorNotifier {
  constructor(private readonly windowsProvider: WindowsProvider) {}

  async notifyCursorChanged(page: number) {
    const promises = this.windowsProvider.getWindows().map((w) => {
      w.webContents.postMessage("cursor-notification", {
        type: "on.cursor-changed",
        page,
      });
    });
    await Promise.allSettled(promises);
  }
}
