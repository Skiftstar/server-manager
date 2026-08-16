import { Router } from "express";
import {
  createFolder,
  readFile,
  writeToFile,
} from "../controllers/fileSystemController";

const router = Router();

router.post("/mkdir", createFolder);
router.post("/write", writeToFile);
router.get("/read", readFile);

export default router;
