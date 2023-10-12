import express from "express";
import { upload, uploadFile } from "../controllers/upload.js";

const router = express.Router();
router.post("/upload", upload.single('image'), uploadFile);

export default router;