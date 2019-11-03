const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user');


const controller = new Controller;

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUser)
router.post('/', controller.addUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

module.exports = router;
