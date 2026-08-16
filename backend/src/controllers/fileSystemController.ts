import { NextFunction, Request, Response } from "express";
import * as fileSystemService from "../services/fileSystemService";

export const createFolder = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { path } = req.body;

  if (await fileSystemService.createFolder(path)) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

export const scanDir = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const path = req.query.path;
  if (!path) {
    return res.status(400).send();
  }

  res.status(200).json(await fileSystemService.scanDirectory(path as string));
};

export const writeToFile = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { path, content } = req.body;

  if (await fileSystemService.writeToFile(path, content)) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
};

export const readFile = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const path = req.query.path;
  if (!path) {
    return res.status(400).send();
  }

  const fileContents = await fileSystemService.getFileContents(path as string);

  if (fileContents) {
    res.status(200).type("text/plain").send(fileContents);
  } else {
    res.status(500).send();
  }
};
