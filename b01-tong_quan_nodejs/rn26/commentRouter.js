const { Router } = require("express");
const {
    readAll,
    create,
    update,
    remove,
    createUserModel,
} = require('./comment_schema');
const { verifyUser } = require("./middleware");



const commentRouter = Router();
commentRouter.get('/', async (req, res) => {
    const query = req.query;
    const data = await readAll({});
    res.status(200).json(data);
});

commentRouter.post('/', verifyUser ,async (req, res) => {
    const body = req.body;
    const user = req.user;
    const data = await createUserModel({
        ...body,
        author: user._id,
    });
    res.status(200).json(data);
});



module.exports = commentRouter;