import { Router } from "express";
import { getCrontabs, writeCrontabs } from "../controllers/cronController";

const router = Router();

router.get("/list", getCrontabs);
router.post("/write", writeCrontabs);

export default router;
