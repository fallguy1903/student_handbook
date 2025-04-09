const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

// signup POST
router.post('/register', userController.postRegister);

// login POST
router.post('/login', userController.postLogin);

module.exports = router;