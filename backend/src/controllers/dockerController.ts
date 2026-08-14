import { NextFunction, Request, Response } from "express";
import * as dockerService from "../services/dockerService";
import { SimpleContainerResponse } from "../types/dockerTypes";

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
