import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";

export default class TempDir {
  private constructor(private dir: string) {}

  static create(): TempDir {
    const prefix = path.join(os.tmpdir(), "sanscadre-");
    const dir = fs.mkdtempSync(prefix);
    return new TempDir(dir);
  }

  createPath(suffix = "") {
    const file = uuidv4() + suffix;
    return path.join(this.dir, file);
  }

  async cleanup() {
    await fs.promises.rmdir(this.dir, {
      recursive: true,
    });
  }
}
