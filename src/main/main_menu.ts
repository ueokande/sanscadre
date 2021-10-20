import { Menu, shell } from "electron";

interface Props {
  onResize: (ratio: "4:3" | "16:9") => void;
  onShowController: () => void;
}

const createTemplate = (
  props: Props
): Array<Electron.MenuItemConstructorOptions> => {
  return [
    { role: "appMenu" },
    {
      label: "File",
      submenu: [{ role: "close" }],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        {
          label: "Resize",
          submenu: [
            {
              label: "Standard (4:3)",
              click: () => props.onResize("4:3"),
            },
            {
              label: "Widescreen (16:9)",
              click: () => props.onResize("16:9"),
            },
          ],
        },
        {
          label: "Show Controller",
          click: () => props.onShowController(),
        },
        { type: "separator" },
        { role: "front" },
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Visit website",
          click: async () => {
            await shell.openExternal("https://github.com/ueokande/sanscadre/");
          },
        },
      ],
    },
  ];
};

export const create = (props: Props): Electron.Menu => {
  if (process.platform === "darwin") {
    const template = createTemplate(props);
    return Menu.buildFromTemplate(template);
  }
  return new Menu();
};
