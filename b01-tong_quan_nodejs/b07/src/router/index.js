const { Router } = require("express");
const { verifyUser } = require("../middleware/auth.middleware");


const appRouter = Router();

appRouter.use('/user', verifyUser, require('./user.router'));
// appRouter.use('/comment', require('./commentRouter'));
appRouter.use('/auth', require('./auth.router'));
appRouter.use('/file', require('./file.router'));

module.exports = appRouter;
