import { NextFunction, Request, Response } from "express";
import * as configService from "../services/configService";

export const getConfig = async (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json(configService.getConfig());
};
