import express from "express";
import { googleAuth, logoutUser } from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

router.post("/google", googleAuth);
router.post("/logout", verifyJWT, logoutUser);

export default authRouter;
