import { ipcRenderer } from "electron";

export const saveTempFile = async (
  content: Buffer,
  suffix = ""
): Promise<string> => {
  return await ipcRenderer.invoke("save-temp-file", content, suffix);
};

export const resize = async (ratio: "16:9" | "4:3"): Promise<void> => {
  return await ipcRenderer.invoke("resize", ratio);
};
