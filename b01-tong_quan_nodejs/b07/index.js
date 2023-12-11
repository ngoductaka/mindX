const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connect } = require('./src/model/mongo_connect');
const Router = require('./src/router');
// DB connect
connect();
const app = express();
// config cors
cors(app);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use('/', Router);

app.listen(3000, () => {
    console.log(`Example app listening on: ${3000}`)
})