import {Request, Response} from "express";
import User from '../models/User';
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

class Controller {
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
        const updQuery: any = {};

        if(req.body.name) {
            updQuery.name = req.body.name
        }
        if(req.body.nickname) {
            updQuery.nickname = req.body.nickname
        }
        if(req.body.surname) {
            updQuery.surname = req.body.surname
        }
        if(req.body.sex) {
            updQuery.sex = req.body.sex
        }
        if(req.body.city) {
            updQuery.city = req.body.city
        }
        if(req.body.country) {
            updQuery.country = req.body.country
        }
        if(req.body.age) {
            updQuery.age = req.body.age
        }

        const updUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            updQuery,
            {new: true}
        );
        res.status(201).send( updQuery)
    };

//Delete
    async deleteUser(req: Request, res: Response) {
        const targetUser = await User.deleteOne({
            _id: req.params.id
        });
        res.status(200).send(targetUser)
    }
}
module.exports = Controller;

