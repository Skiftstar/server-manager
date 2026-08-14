import { Router } from "express";
import { scanScriptsDir } from "../controllers/scriptsController";

const router = Router();

router.get("/scan", scanScriptsDir);

export default router;
