import { NextFunction, Request, Response } from "express";
import * as fileSystemService from "../services/fileSystemService";
import { MessageResponse } from "../types/apiTypes";

export const createFolder = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const { path } = req.body;

  if (await fileSystemService.createFolder(path)) {
    res.status(200).json({ message: "FOLDER_CREATED" });
  } else {
    res.status(500).json({ message: "FOLDER_CREATE_FAILED" });
  }
};

export const scanDir = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const path = req.query.path;
  if (!path) {
    return res.status(400).json({ message: "PATH_QUERY_REQUIRED" });
  }

  res.status(200).json(await fileSystemService.scanDirectory(path as string));
};

export const writeToFile = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const { path, content } = req.body;

  if (await fileSystemService.writeToFile(path, content)) {
    res.status(200).json({ message: "FILE_WRITTEN" });
  } else {
    res.status(500).json({ message: "FILE_WRITE_FAILED" });
  }
};

export const chmodFile = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const { path, permissionsString } = req.body;

  if (await fileSystemService.chmodFile(path, permissionsString)) {
    res.status(200).json({ message: "PERMISSIONS_UPDATED" });
  } else {
    res.status(500).json({ message: "PERMISSIONS_UPDATE_FAILED" });
  }
};

export const readFile = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const path = req.query.path;
  if (!path) {
    return res.status(400).json({ message: "PATH_QUERY_REQUIRED" });
  }

  const fileContents = await fileSystemService.getFileContents(path as string);

  if (fileContents !== undefined) {
    res.status(200).type("text/plain").send(fileContents);
  } else {
    res.status(500).json({ message: "FILE_READ_FAILED" });
  }
};

export const removePath = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const path = req.query.path;
  if (!path) {
    return res.status(400).json({ message: "PATH_QUERY_REQUIRED" });
  }

  const pathRemoved = await fileSystemService.removePath(path as string);

  if (pathRemoved) {
    res.status(200).json({ message: "PATH_REMOVED" });
  } else {
    res.status(500).json({ message: "PATH_REMOVE_FAILED" });
  }
};
