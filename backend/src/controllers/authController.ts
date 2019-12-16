import {User} from '../models/User';
import {registerValidation, loginValidation} from '../validation';
import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {config} from "../config";
mongoose.set('useFindAndModify', false);
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {errorMessages} from "../errors";

export class Controller {

    async userRegister(req: Request, res: Response) {
        // Validate the data before we make a user
        const { error } = registerValidation(req.body);
        if(error) {
            res.status(errorMessages.VALIDATION_ERROR.statusCode).send(
                errorMessages.VALIDATION_ERROR.message + ": " + error.details[0].message
            )
        }

        //Check if user is already in the database
        const emailExists = await User.findOne({
            email: req.body.email
        });
        if(emailExists) {
            return res.status(errorMessages.EMAIL_EXISTS_ERROR.statusCode).send(
                errorMessages.EMAIL_EXISTS_ERROR.message
            )
        }

        //Hash passwords
        //salt = mess of a string 10 - is default. Salt combines with pass and create mess
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const user = new User({
            name: req.body.name,
            nickname: req.body.nickname,
            email: req.body.email,
            password: hashedPassword
        });
        try {
            const savedUser = await user.save();
            res.status(201).send(savedUser)
        } catch(err) {
            res.status(400).send(err)
        }
    }

    //LOGIN
    async userLogin(req: Request, res: Response) {

        // Validate the data before we login the user
        const { error } = await loginValidation(req.body);
        if(error) {
            res.status(errorMessages.VALIDATION_ERROR.statusCode).send(
                errorMessages.VALIDATION_ERROR.message + ": " + error.details[0].message
            )
        }

        // Check if the user exists (check email)
        const userExists: any = await User.findOne({email: req.body.email});

        if(!userExists) {
            return res.status(errorMessages.WRONG_EMAIL_ERROR.statusCode).send(
                errorMessages.WRONG_EMAIL_ERROR.message
            )
        }
        // Check password if it's correct
        const validPass = await bcrypt.compare(req.body.password, userExists.password); //returns true or false
        if(!validPass) {
            return res.status(errorMessages.INVALID_PASSWORD_ERROR.statusCode).send(
                errorMessages.INVALID_PASSWORD_ERROR.message
            )
        }

        //Create and assign JWT (JSON web token)
        const token = jwt.sign({_id: userExists._id}, config.TOKEN_SECRET);

        // auth-token - is a custom responce header
        res.header('auth-token', token).send({token: token, user: userExists, expiresIn: 3600})
    }
}

