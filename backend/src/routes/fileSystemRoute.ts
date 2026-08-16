import { Router } from "express";
import {
  createFolder,
  readFile,
  scanDir,
  writeToFile,
} from "../controllers/fileSystemController";

const router = Router();

router.post("/mkdir", createFolder);
router.post("/write", writeToFile);
router.get("/read", readFile);
router.get("/scan", scanDir);

export default router;
