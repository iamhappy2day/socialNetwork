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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
class Controller {
    //getAll
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(yield User_1.default.find());
        });
    }
    ;
    //GetOneById
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetUser = yield User_1.default.findById(req.params.id);
            res.status(200).send(targetUser);
        });
    }
    ;
    //Update
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updQuery = {};
            if (req.body.name) {
                updQuery.name = req.body.name;
            }
            if (req.body.nickname) {
                updQuery.nickname = req.body.nickname;
            }
            if (req.body.surname) {
                updQuery.surname = req.body.surname;
            }
            if (req.body.sex) {
                updQuery.sex = req.body.sex;
            }
            if (req.body.city) {
                updQuery.city = req.body.city;
            }
            if (req.body.country) {
                updQuery.country = req.body.country;
            }
            if (req.body.age) {
                updQuery.age = req.body.age;
            }
            const updUser = yield User_1.default.findOneAndUpdate({ _id: req.params.id }, updQuery, { new: true });
            res.status(201).send(updQuery);
        });
    }
    ;
    //Delete
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetUser = yield User_1.default.deleteOne({
                _id: req.params.id
            });
            res.status(200).send(targetUser);
        });
    }
}
module.exports = Controller;
