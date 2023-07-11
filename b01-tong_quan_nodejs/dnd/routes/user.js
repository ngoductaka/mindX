
const express = require('express');
const { userController } = require('../controller');
const { authMiddleware } = require('../middleware/auth');
const { middlewareValidate, updateUserSchema } = require('../middleware/validate');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getUsers);
userRouter.get('/current',
    userController.getCurrentUser
);
userRouter.patch('/',
    middlewareValidate(updateUserSchema),
    userController.updateUser
);
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;
// be
// 1. CRUD (user)
// 2. login with JWT

// fe 
// CRUD (user)
// man login