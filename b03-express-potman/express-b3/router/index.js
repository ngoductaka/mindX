const express = require('express');
// 
const userRouter = require('./user');
// 
const app = express();

const middleware = (req, res, next) => {
    req.real_name = "vinh";
    console.log('req')
    next();
}
// 
app.use('/user', userRouter)
// app.use('/product', middleware, userRouter)


module.exports = app
