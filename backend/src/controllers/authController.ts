const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
import {Request, Response} from 'express'


class Controller {

    async userRegister(req: Request, res: Response) {
        // Validate the data before we make a user
        const { error } = registerValidation(req.body);
        if(error) {
            res.status(400).send(error.details[0].message)
        }

        //Check if user is already in the database
        const emailExists = await User.findOne({
            email: req.body.email
        });
        if(emailExists) {
            return res.status(400).send('This email already exists')
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
            return res.status(400).send(error.details[0].message)
        }

        // Check if the user exists (check email)
        const userExists = await User.findOne({email: req.body.email});

        if(!userExists) {
            return res.status(400).send('There is no such user... Check the email')
        }
        // Check password if it's correct
        const validPass = await bcrypt.compare(req.body.password, userExists.password); //returns true or fase
        if(!validPass) {
            return res.status(400).send('Invalid password')
        }

        //Create and assign JWT (JSON web token)
        const token = jwt.sign({_id: userExists._id}, process.env.TOKEN_SECRET);

        // auth-token - is a custom responce header
        res.header('auth-token', token).send({token: token, user: userExists, expiresIn: 3600})

    }
}

module.exports = Controller;
