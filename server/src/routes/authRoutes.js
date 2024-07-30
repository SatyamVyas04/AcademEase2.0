import express from "express";
import { googleAuth, logoutUser } from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/google", googleAuth);
router.post("/logout", verifyJWT, logoutUser);

export default router;
