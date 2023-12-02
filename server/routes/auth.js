import express from "express";
import { login, register, verifyUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", verifyUser);

export default router;
