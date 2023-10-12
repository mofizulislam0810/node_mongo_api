import express from "express";
import { deleteProject, getAllProject, getProject, postProject, putProject } from "../controllers/project.js";

const router = express.Router();
router.get("/project", getAllProject);
router.get("/project/:id", getProject);
router.post("/project", postProject);
router.delete("/project/:id", deleteProject);
router.put("/project/:id", putProject);

export default router;