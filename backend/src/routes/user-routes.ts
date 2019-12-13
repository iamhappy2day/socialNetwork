import express from 'express';
export const userRouter = express.Router();
import {Controller} from '../controllers/userController';
import {verifyToken}  from '../verifyToken';

const controller = new Controller;

userRouter.get('/user-profile/:id', verifyToken, controller.getUser);
userRouter.get('/users/:id', controller.getUser);
userRouter.put('/:id',controller.updateUser);
userRouter.get('/',controller.getAllUsers);
userRouter.delete('/:id',controller.deleteUser);


