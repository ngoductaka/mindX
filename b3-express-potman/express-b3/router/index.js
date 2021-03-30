const express = require('express');
// 
const userRouter = require('./user');
// 
const app = express();

const middleware = (req, res, next) => {
    console.log('111111')
    next();
}
// 
app.use('/user', middleware, userRouter)
app.get('/dnd', middleware, (req, res) => {
    res.json({d:'dd'})
})

module.exports = app
