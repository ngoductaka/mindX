// lay thu vien ra 
const express = require('express')
const bodyParser = require('body-parser');
// khoi tao server 
var cors = require('cors');
const userRouter = require('./router/api/user');
var app = express()


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(cors())

const port = 3000

app.get('/', (req, res) => {
    res.send('request with get')
});
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})