import { Router } from "express";
import {
  deleteContainer,
  getAllDockerContainers,
  getContainerLogs,
  startContainer,
  stopContainer,
} from "../controllers/dockerController";

const router = Router();

router.get("/list", getAllDockerContainers);
router.get("/:id/logs", getContainerLogs);
router.delete("/:id", deleteContainer);
router.get("/:id/start", startContainer);
router.get("/:id/stop", stopContainer);

export default router;
