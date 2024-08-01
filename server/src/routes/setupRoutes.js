import express from 'express';
import { setSetupData } from '../controllers/setupController.js';

const setupRouter = express.Router();

setupRouter.post('/submit', setSetupData);

export default setupRouter;
