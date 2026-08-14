import { Router } from "express";
import {
  getAllDockerContainers,
  getContainerLogs,
} from "../controllers/dockerController";

const router = Router();

router.get("/list", getAllDockerContainers);
router.get("/:id/logs", getContainerLogs);

export default router;
