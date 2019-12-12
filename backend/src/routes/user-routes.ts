import express from 'express';
const router = express.Router();
const Controller = require('../controllers/userController');
//const {verifyToken} = require('../verifyToken')

const controller = new Controller;

//router.get('/user-profile/:id', verifyToken, controllers.getUser)
router.get('/users/:id', controller.getUser);
router.put('/users/:id',controller.updateUser);
router.get('/users',controller.getAllUsers);
router.delete('/users/:id',controller.deleteUser);

module.exports = router;
