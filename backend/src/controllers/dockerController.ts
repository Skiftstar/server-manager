import { NextFunction, Request, Response } from "express";
import * as dockerService from "../services/dockerService";
import { SimpleContainerResponse } from "../types/dockerTypes";
import { MessageResponse } from "../types/apiTypes";

export const getAllDockerContainers = async (
  _req: Request,
  res: Response<SimpleContainerResponse[]>,
  _next: NextFunction,
) => {
  res.status(200).json(await dockerService.getAllDockerContainers());
};

export const getContainerLogs = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { id } = req.params;
  const tail = req.query.tail ? Number(req.query.tail) : undefined;

  const logs = await dockerService.getContainerLogs(id as string, tail);

  res.status(200).type("text/plain").send(logs);
};

export const deleteContainer = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const { id } = req.params;

  if (await dockerService.deleteContainer(id as string)) {
    res.status(200).json({ message: "CONTAINER_DELETED" });
  } else {
    res.status(500).json({ message: "CONTAINER_DELETE_FAILED" });
  }
};

export const startContainer = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const { id } = req.params;

  if (await dockerService.startContainer(id as string)) {
    res.status(200).json({ message: "CONTAINER_STARTED" });
  } else {
    res.status(500).json({ message: "CONTAINER_START_FAILED" });
  }
};

export const stopContainer = async (
  req: Request,
  res: Response<MessageResponse>,
  _next: NextFunction,
) => {
  const { id } = req.params;

  if (await dockerService.stopContainer(id as string)) {
    res.status(200).json({ message: "CONTAINER_STOPPED" });
  } else {
    res.status(500).json({ message: "CONTAINER_STOP_FAILED" });
  }
};
