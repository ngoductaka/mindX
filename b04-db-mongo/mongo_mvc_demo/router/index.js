const express = require('express');
const User = require('./user.route');
// 
const app = express();

app.use('/user', User)

module.exports = app;