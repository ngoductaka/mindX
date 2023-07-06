
const express = require('express');
const { userController } = require('../controller');
const { authMiddleware } = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.login);
// userRouter.get('/', userController.getUsers);
userRouter.get('/current',
    authMiddleware,
    userController.getCurrentUser
);
userRouter.patch('/',);
userRouter.delete('/',);

module.exports = userRouter;
// be
// 1. CRUD (user)
// 2. login with JWT

// fe 
// CRUD (user)
// man login