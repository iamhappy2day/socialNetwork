import express from 'express';
const router = express.Router();
const Controller = require('../controllers/authController')
const controller = new Controller;

router.post('/register', controller.userRegister);
router.post('/login', controller.userLogin);

module.exports = router;
