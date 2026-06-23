import { Router } from "express";
import { getArticles } from "../controllers/newsletterController";

const router = Router();

router.get("/", getArticles);

export default router;
