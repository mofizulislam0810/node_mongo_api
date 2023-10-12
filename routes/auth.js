import express from "express";
import { loginUser, protectedChecked, refreshToken, registerUser, varifyUser } from "../controllers/auth.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/refresh-token', refreshToken);
router.get('/varify', varifyUser);
router.get('/protected-route', verifyToken, protectedChecked);

export default router;