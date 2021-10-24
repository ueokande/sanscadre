import { BrowserWindow } from "electron";

class WindowsProvider {
  private readonly windows: Map<number, BrowserWindow> = new Map();

  add(window: BrowserWindow) {
    this.windows.set(window.id, window);
  }

  remove(window: BrowserWindow) {
    this.windows.delete(window.id);
  }

  getWindows(): BrowserWindow[] {
    return Array.from(this.windows.values());
  }
}

export default WindowsProvider;
