import express from "express";
import { googleAuth, logoutUser } from "../controllers/authController.js";
import { verifyJWT, getCurrentUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.get("/me", verifyJWT, getCurrentUser);

export default authRouter;
