import express from 'express';
export const authRouter = express.Router();
import {Controller} from '../controllers/authController'
const controller = new Controller;

authRouter.post('/register', controller.userRegister);
authRouter.post('/login', controller.userLogin);


