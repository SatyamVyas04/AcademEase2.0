import express from 'express';
import { googleAuth } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/google', googleAuth);

export default authRouter;
