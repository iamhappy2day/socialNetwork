import {Request, Response} from "express";
import {User} from '../models/User';
import mongoose from 'mongoose';
import {userUpdValidation} from "../validation";
import {errorMessages} from "../errors";
mongoose.set('useFindAndModify', false);

export class Controller {
//getAll
    async getAllUsers(req: Request, res: Response) {
        res.status(200).send(await User.find())
    };

//GetOneById
    async getUser(req: Request, res: Response) {
        const targetUser = await User.findById(req.params.id)
        res.status(200).send(targetUser)
    };

//Update
    async updateUser(req: Request, res: Response) {

        // Middleware for validation the data before we will update user
        const { error } = userUpdValidation(req.body);
        if(error) {
            res.status(errorMessages.VALIDATION_ERROR.statusCode).send(
                errorMessages.VALIDATION_ERROR.message + ": " + error.details[0].message)
        }

        const updUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        );
        res.status(201).send( updUser )

    };

//Delete
    async deleteUser(req: Request, res: Response) {
        const targetUser = await User.deleteOne({
            _id: req.params.id
        });
        res.status(200).send(targetUser)
    }
}


