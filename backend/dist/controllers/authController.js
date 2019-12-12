"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
class Controller {
    userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the data before we make a user
            const { error } = registerValidation(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            }
            //Check if user is already in the database
            const emailExists = yield User.findOne({
                email: req.body.email
            });
            if (emailExists) {
                return res.status(400).send('This email already exists');
            }
            //Hash passwords
            //salt = mess of a string 10 - is default. Salt combines with pass and create mess
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(req.body.password, salt);
            // create new user
            const user = new User({
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: hashedPassword
            });
            try {
                const savedUser = yield user.save();
                res.status(201).send(savedUser);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
    }
    //LOGIN
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the data before we login the user
            const { error } = yield loginValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            // Check if the user exists (check email)
            const userExists = yield User.findOne({ email: req.body.email });
            if (!userExists) {
                return res.status(400).send('There is no such user... Check the email');
            }
            // Check password if it's correct
            const validPass = yield bcrypt.compare(req.body.password, userExists.password); //returns true or fase
            if (!validPass) {
                return res.status(400).send('Invalid password');
            }
            //Create and assign JWT (JSON web token)
            const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
            // auth-token - is a custom responce header
            res.header('auth-token', token).send({ token: token, user: userExists, expiresIn: 3600 });
        });
    }
}
module.exports = Controller;
