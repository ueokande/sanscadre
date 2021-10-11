import { ipcRenderer } from "electron";

export const resize = async (ratio: "16:9" | "4:3"): Promise<void> => {
  return await ipcRenderer.invoke("resize", ratio);
};
