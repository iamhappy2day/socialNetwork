"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Shema = mongoose_1.default.Schema;
const UserSchema = new Shema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 3
    },
    age: {
        type: Number
    },
    surname: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    sex: {
        type: String
    }
});
exports.default = module.exports = mongoose_1.default.model('User', UserSchema);
