import { Menu } from "electron";

interface Props {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onResize: (ratio: "4:3" | "16:9") => void;
  onShowController: () => void;
}

const createTemplate = ({
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  onResize,
  onShowController,
}: Props): Array<Electron.MenuItemConstructorOptions> => [
  {
    label: "Next",
    click: onNextPage,
    enabled: hasNextPage,
  },
  {
    label: "Previous",
    click: onPrevPage,
    enabled: hasPrevPage,
  },
  {
    label: "Resize",
    submenu: [
      {
        label: "Standard (4:3)",
        click: () => onResize("4:3"),
      },
      {
        label: "Widescreen (16:9)",
        click: () => onResize("16:9"),
      },
    ],
  },
  {
    label: "Show Controller",
    click: onShowController,
  },
];

export const create = (props: Props): Electron.Menu => {
  const template = createTemplate(props);
  return Menu.buildFromTemplate(template);
};
