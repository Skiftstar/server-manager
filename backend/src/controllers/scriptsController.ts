import { NextFunction, Request, Response } from "express";
import * as fileSystemService from "../services/fileSystemService";
import { getConfig } from "../services/configService";
import { FSObject } from "../types/fileSystemTypes";

export const scanScriptsDir = async (
  _req: Request,
  res: Response<FSObject[]>,
  _next: NextFunction,
) => {
  res
    .status(200)
    .json(await fileSystemService.scanDirectory(getConfig().scriptsDir));
};
