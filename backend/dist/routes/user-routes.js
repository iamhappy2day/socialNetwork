"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Controller = require('../controllers/userController');
const { verifyToken } = require('../verifyToken');
const controller = new Controller;
router.get('/user-profile/:id', verifyToken, controller.getUser);
router.get('/users/:id', controller.getUser);
router.put('/:id', controller.updateUser);
router.get('/', controller.getAllUsers);
router.delete('/:id', controller.deleteUser);
module.exports = router;
