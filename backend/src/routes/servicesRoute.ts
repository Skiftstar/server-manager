import { Router } from "express";
import { scanServicesDir } from "../controllers/servicesController";

const router = Router();

router.get("/scan", scanServicesDir);

export default router;
