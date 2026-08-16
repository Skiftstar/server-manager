import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { FSObject } from "../types/fileSystemTypes";
import { join } from "node:path";

export const scanDirectory = async (path: string): Promise<FSObject[]> => {
  const entries = await readdir(path, { withFileTypes: true });

  const nodes = await Promise.all(
    entries.map(async (entry): Promise<FSObject> => {
      const fullPath = join(path, entry.name);

      if (entry.isDirectory()) {
        return {
          name: entry.name,
          fullPath: fullPath,
          type: "DIR",
          children: await scanDirectory(fullPath),
        };
      }

      return {
        name: entry.name,
        fullPath: fullPath,
        type: "FILE",
      };
    }),
  );

  return nodes;
};

export const getFileContents = async (path: string) => {
  try {
    const content = readFile(path, "utf-8");
    return content;
  } catch {
    return undefined;
  }
};

export const createFolder = async (path: string) => {
  try {
    await mkdir(path);
    return true;
  } catch {
    return false;
  }
};

export const writeToFile = async (path: string, content: string) => {
  try {
    await writeFile(path, content, "utf-8");
    return true;
  } catch {
    return false;
  }
};
