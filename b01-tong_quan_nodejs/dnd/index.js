require('dotenv').config();

const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
const { connect } = require('./models/connect')

var app = express();

// config body-parser (parse body) req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// config cors 
app.use(cors())

connect()


app.use('/', require('./routes/index'));


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Example app listening on port: ${port}!`)
})
