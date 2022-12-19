require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authen = require('./middlewares/auth.js');

const userController = require('./controllers/userController')
const CommentController = require('./controllers/CommentController')
// const articleController = require('./controllers/articleController')
const { connect } = require('./models/connect');

connect();

// 3.4.1 Authentication:
// POST /api/users/login
// app.get('/', CommentController.test);
// app.get('/user', userController.register)
app.get('/user', userController.getAllUser)

const POST = process.env.POST || 5001
app.listen(POST, () => console.log("run with mongoo on post " + POST))