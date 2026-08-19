import { Router } from "express";
import {
  chmodFile,
  createFolder,
  readFile,
  removePath,
  scanDir,
  writeToFile,
} from "../controllers/fileSystemController";

const router = Router();

router.post("/mkdir", createFolder);
router.post("/write", writeToFile);
router.post("/chmod", chmodFile);
router.get("/read", readFile);
router.get("/scan", scanDir);
router.delete("/rm", removePath);

export default router;
