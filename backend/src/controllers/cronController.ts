import { NextFunction, Request, Response } from "express";
import * as cronService from "../services/cronService";
import { CronTab } from "../types/cronTypes";

export const getCrontabs = async (
  _req: Request,
  res: Response<CronTab[]>,
  _next: NextFunction,
) => {
  res.status(200).json(await cronService.getCrontabs());
};

export const writeCrontabs = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { crontabs }: { crontabs: CronTab[] } = req.body;

  if (await cronService.writeCrontabs(crontabs)) {
    return res.status(201).send();
  } else {
    return res.status(500).send();
  }
};
