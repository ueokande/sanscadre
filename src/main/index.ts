import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  nativeImage,
  Menu,
} from "electron";
import path from "path";
import { format as formatUrl } from "url";
import { create as createMenu } from "./menu";
import Router from "./router";
import DocumentUseCase from "./usecases/DocumentUseCase";
import CursorUseCase from "./usecases/CursorUseCase";
import { DocumentRepositoryImpl } from "./repositories/DocumentRepository";
import { DocumentNotifierImpl } from "./notifiers/DocumentNotifier";
import { CursorRepositoryImpl } from "./repositories/CursorRepository";
import { CursorNotifierImpl } from "./notifiers/CursorNotifier";
import { PageRepositoryImpl } from "./repositories/PageRepository";

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow | null;

const resize = (ratio: "16:9" | "4:3") => {
  if (mainWindow === null) {
    return;
  }
  let [width, height] = mainWindow.getSize();
  switch (ratio) {
    case "16:9":
      height = width / (16 / 9);
      break;
    case "4:3":
      height = width / (4 / 3);
      break;
    default:
      throw new Error("unexpected ratio: " + ratio);
  }
  mainWindow.setSize(width, height, true);
};

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

  const menu = createMenu({
    onResize: (ratio: "4:3" | "16:9") => resize(ratio),
  });
  Menu.setApplicationMenu(menu);

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

    const documentRepository = new DocumentRepositoryImpl();
    const documentNotifier = new DocumentNotifierImpl(mainWindow.webContents);
    const cursorRepository = new CursorRepositoryImpl();
    const pageRepository = new PageRepositoryImpl();
    const cursorNotifier = new CursorNotifierImpl(mainWindow.webContents);
    const cursorUseCase = new CursorUseCase(
      cursorRepository,
      documentRepository,
      cursorNotifier
    );
    const documentUseCase = new DocumentUseCase(
      pageRepository,
      documentRepository,
      documentNotifier
    );
    const router = new Router(documentUseCase, cursorUseCase);

    router.run();
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow();

  const documentRepository = new DocumentRepositoryImpl();
  const documentNotifier = new DocumentNotifierImpl(mainWindow.webContents);
  const cursorRepository = new CursorRepositoryImpl();
  const pageRepository = new PageRepositoryImpl();
  const cursorNotifier = new CursorNotifierImpl(mainWindow.webContents);
  const cursorUseCase = new CursorUseCase(
    cursorRepository,
    documentRepository,
    cursorNotifier
  );
  const documentUseCase = new DocumentUseCase(
    pageRepository,
    documentRepository,
    documentNotifier
  );
  const router = new Router(documentUseCase, cursorUseCase);

  router.run();
});

app.whenReady().then(() => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""));
    callback(pathname);
  });
});

ipcMain.handle("resize", async (event, ratio: "16:9" | "4:3") => {
  resize(ratio);
});
