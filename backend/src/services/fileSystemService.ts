import { readdir } from "node:fs/promises";
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
