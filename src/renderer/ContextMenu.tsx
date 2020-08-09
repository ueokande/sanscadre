import React from "react";
import { remote } from "electron";
import AppContext from "./AppContext";
import * as ipc from "./ipc";

const { Menu } = remote;

const ContextMenu = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const menu = React.useRef(new Menu());

  React.useEffect(() => {
    menu.current = Menu.buildFromTemplate([
      {
        label: "Next",
        click: () => dispatch({ type: "NEXT_PAGE" }),
        enabled:
          state.pages.length > 0 && state.active !== state.pages.length - 1,
      },
      {
        label: "Previous",
        click: () => dispatch({ type: "PREV_PAGE" }),
        enabled: state.pages.length > 0 && state.active !== 0,
      },
      {
        label: "Resize",
        submenu: [
          {
            label: "Standard (4:3)",
            click: () => ipc.resize("4:3"),
          },
          {
            label: "Widescreen (16:9)",
            click: () => ipc.resize("16:9"),
          },
        ],
      },
    ]);
  }, [state]);

  const handleContextMenu = React.useCallback((e: Event) => {
    if (menu.current === undefined) {
      return;
    }
    e.preventDefault();
    menu.current.popup({ window: remote.getCurrentWindow() });
  }, []);

  React.useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu, false);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [window]);
  return null;
};

export default ContextMenu;
