const express = require('express')
const authRouter = express.Router();

const loginController = require('../controller/login.controller');

authRouter.post('/', loginController.login)

module.exports = authRouter;
