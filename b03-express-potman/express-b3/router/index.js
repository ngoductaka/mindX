const express = require('express');
// 
const userRouter = require('./user');
// 
const app = express();

const middleware = (req, res, next) => {
    console.log(req)
    next();
}
// 
app.use('/user', middleware, userRouter)


module.exports = app
