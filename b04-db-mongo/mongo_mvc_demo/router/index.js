const express = require('express');
const User = require('./user.route');
// 
const app = express();

const logger = (req, res, next) => {
    console.log('proxy: ', req.headers);
    next();
}
app.use('/',logger, User)

module.exports = app;