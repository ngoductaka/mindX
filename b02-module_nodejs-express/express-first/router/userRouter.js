const express = require('express')
const userRouter = express.Router();

const userController = require('../controller/user.controller');
// create
userRouter.post('/', userController.create)
// read all
userRouter.get('/', (req, res) => {
})
// read one
userRouter.get('/:userId', (req, res) => {
})

// update one
userRouter.patch('/:userId', (req, res) => {
})

// delete one
userRouter.delete('/:userId', (req, res) => {
})

module.exports = userRouter;
