import { Router } from "express";
import {
  getCPUUsage,
  getDiskUsage,
  getMemoryUsage,
  getNetworkUsage,
  getRunningProcesses,
} from "../controllers/sysResourcesController";

const router = Router();

router.get("/cpu", getCPUUsage);

router.get("/memory", getMemoryUsage);

router.get("/disks", getDiskUsage);

router.get("/network", getNetworkUsage);

router.get("/processes", getRunningProcesses);

export default router;
