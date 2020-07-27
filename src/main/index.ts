import { app, protocol, BrowserWindow, ipcMain, nativeImage } from "electron";
import path from "path";
import fs from "fs";
import { format as formatUrl } from "url";
import TempDir from "./TempDir";

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow | null;
const tempdir = TempDir.create();

function createMainWindow() {
  const image = nativeImage.createFromPath(
    (() => {
      if (isDevelopment) {
        return path.join(__dirname, "..", "..", "build", "icon.png");
      }
      return path.join(__dirname, "build", "icon.png");
    })()
  );
  image.setTemplateImage(true);

  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    frame: false,
    titleBarStyle: "customButtonsOnHover",
    icon: image,
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow();
});

app.on("will-quit", () => {
  tempdir.cleanup();
});

app.whenReady().then(() => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""));
    callback(pathname);
  });
});

ipcMain.handle("save-temp-file", async (event, content, suffix) => {
  const p = tempdir.createPath(suffix);
  await fs.promises.writeFile(p, content);
  return p;
});
