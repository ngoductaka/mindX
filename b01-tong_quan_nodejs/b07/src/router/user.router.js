const { Router } = require("express");
const { userController } = require('../controller');
const { patchUserSchema } = require('../validate/user.validate');
const { validateRequest } = require('../validate/validate');


const userRouter = Router();

userRouter.get('/', userController.getListUser);
userRouter.patch(
    '/',
    validateRequest(patchUserSchema), // joi
    userController.updateUser
);


module.exports = userRouter;
