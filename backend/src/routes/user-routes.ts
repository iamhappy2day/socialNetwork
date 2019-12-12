import express from 'express';
const router = express.Router();
const Controller = require('../controllers/userController');
const {verifyToken} = require('../verifyToken');

const controller = new Controller;

router.get('/user-profile/:id', verifyToken, controller.getUser);
router.get('/users/:id', controller.getUser);
router.put('/:id',controller.updateUser);
router.get('/',controller.getAllUsers);
router.delete('/:id',controller.deleteUser);

module.exports = router;
