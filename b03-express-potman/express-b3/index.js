const express = require('express');
var bodyParser = require('body-parser')

const router = require('./router');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const port = 3000;

app.use(express.static('anh'))

app.use('/', router);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

