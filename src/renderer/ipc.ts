import { ipcRenderer } from "electron";

export const saveTempFile = async (
  content: Buffer,
  suffix = ""
): Promise<string> => {
  return await ipcRenderer.invoke("save-temp-file", content, suffix);
};
