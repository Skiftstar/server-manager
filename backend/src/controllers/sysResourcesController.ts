import { NextFunction, Request, Response } from "express";
import * as sysResourcesService from "../services/sysResourcesService";
import { NetworkResponse } from "../types/networkTypes";

export const getCPUUsage = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json(await sysResourcesService.getCPUUsage());
};

export const getMemoryUsage = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json(sysResourcesService.getMemoryUsage());
};

export const getDiskUsage = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json(sysResourcesService.getDiskUsage());
};

export const getRunningProcesses = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json(await sysResourcesService.getProcessCount());
};

export const getNetworkUsage = async (
  _req: Request,
  res: Response<NetworkResponse[]>,
  _next: NextFunction,
) => {
  res.status(200).json(await sysResourcesService.getNetworkUsage());
};
