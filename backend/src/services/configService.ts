import { readFile, access, writeFile } from "fs/promises";
import { Config } from "../types/configTypes";
import { CONFIG_PATH, DEFAULT_CONFIG } from "../config/defaults";

let config: Config | null = null;

export const loadConfig = async () => {
  await createConfigIfNotExists();
  try {
    const fileContent = await readFile(CONFIG_PATH, "utf-8");
    config = JSON.parse(fileContent);
  } catch {
    console.error("Failed reading config! Using default config instead!");
    config = DEFAULT_CONFIG;
  }
};

export const getConfig = () => {
  return config ?? DEFAULT_CONFIG;
};

export const updateConfig = async (data: Config) => {
  await writeToConfig(data);
  await loadConfig();
};

const createConfigIfNotExists = async () => {
  if (await doesConfigExist()) return;

  await writeToConfig(DEFAULT_CONFIG);
};

const doesConfigExist = async () => {
  try {
    await access(CONFIG_PATH);
    return true;
  } catch {
    return false;
  }
};

const writeToConfig = async (data: Config) => {
  try {
    await writeFile(CONFIG_PATH, JSON.stringify(data, null, 4));
  } catch {
    console.error("Failed writing to config!");
  }
};
