import fs from "node:fs/promises";
import path from "node:path";

export async function createFile(filePath: any, lists: string[]) {
  lists.forEach(async (list) => {
    await fs.writeFile(path.join(filePath, list), "");
  });
}
