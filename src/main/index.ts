import { app, protocol, BrowserWindow, nativeImage, Menu } from "electron";
import path from "path";
import { format as formatUrl } from "url";
import { create as createMainMenu } from "./main_menu";
import { create as createContextMenu } from "./context_menu";
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
let cursorUseCase: CursorUseCase;
let documentUseCase: DocumentUseCase;

const resize = (ratio: "16:9" | "4:3") => {
  if (mainWindow === null) {
    return;
  }
  let [width, height] = mainWindow.getSize();
  switch (ratio) {
    case "16:9":
      height = Math.floor(width / (16 / 9));
      break;
    case "4:3":
      height = Math.floor(width / (4 / 3));
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

  const mainMenu = createMainMenu({
    onResize: (ratio: "4:3" | "16:9") => resize(ratio),
  });
  Menu.setApplicationMenu(mainMenu);

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

  window.webContents.on("context-menu", (e) => {
    e?.preventDefault();
    const contextMenu = createContextMenu({
      hasNextPage: cursorUseCase?.hasNextPage(),
      hasPrevPage: cursorUseCase?.hasPrevPage(),
      onNextPage: () => cursorUseCase?.goNext(),
      onPrevPage: () => cursorUseCase?.goPrev(),
      onResize: (ratio: "4:3" | "16:9") => resize(ratio),
    });
    contextMenu.popup();
  });

  return window;
}

function initApp(mainWindow: BrowserWindow) {
  const documentRepository = new DocumentRepositoryImpl();
  const documentNotifier = new DocumentNotifierImpl(mainWindow.webContents);
  const cursorRepository = new CursorRepositoryImpl();
  const pageRepository = new PageRepositoryImpl();
  const cursorNotifier = new CursorNotifierImpl(mainWindow.webContents);
  cursorUseCase = new CursorUseCase(
    cursorRepository,
    documentRepository,
    cursorNotifier
  );
  documentUseCase = new DocumentUseCase(
    pageRepository,
    documentRepository,
    documentNotifier
  );
  const router = new Router(documentUseCase, cursorUseCase);

  router.run();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
    initApp(mainWindow);
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow();
  initApp(mainWindow);
});

app.whenReady().then(() => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""));
    callback(pathname);
  });
});
