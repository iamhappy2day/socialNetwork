const express = require('express');
const router = express.Router(); 
const User = require('../models/User')
const Controller = require('../controllers/auth')

const controller = new Controller;

router.post('/register', controller.userRegister)
router.post('/login', controller.userLogin)

module.exports = router;