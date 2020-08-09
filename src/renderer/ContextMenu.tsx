import React from "react";
import { remote } from "electron";
import AppContext from "./AppContext";

const { Menu, MenuItem } = remote;

const ContextMenu = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const menu = React.useRef(new Menu());

  React.useEffect(() => {
    const newMenu = new Menu();
    newMenu.append(
      new MenuItem({
        label: "Next",
        click: () => dispatch({ type: "NEXT_PAGE" }),
        enabled:
          state.pages.length > 0 && state.active !== state.pages.length - 1,
      })
    );
    newMenu.append(
      new MenuItem({
        label: "Previous",
        click: () => dispatch({ type: "PREV_PAGE" }),
        enabled: state.pages.length > 0 && state.active !== 0,
      })
    );
    menu.current = newMenu;
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
