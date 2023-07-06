
const express = require('express');
const { userController } = require('../controller');
const { authMiddleware } = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
// userRouter.get('/', userController.getUsers); find user 
userRouter.get('/current',
    
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