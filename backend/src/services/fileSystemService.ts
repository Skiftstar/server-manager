import {
  chmod,
  lstat,
  mkdir,
  readdir,
  readFile,
  rm,
  rmdir,
  writeFile,
} from "node:fs/promises";
import { FSObject } from "../types/fileSystemTypes";
import { join } from "node:path";

export const chmodFile = async (path: string, permissionsString: string) => {
  try {
    await chmod(path, permissionsString);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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
  } catch (error) {
    console.error(error);
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

export const removePath = async (path: string) => {
  const entry = await lstat(path);
  try {
    if (entry.isDirectory()) {
      await rmdir(path);
    } else {
      await rm(path);
    }
    return true;
  } catch {
    return false;
  }
};
