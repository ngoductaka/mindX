const express = require('express')
const studentRouter = express.Router()

studentRouter.get('/', (req, res) => {
    res.send('<h1>ddddd</h1>')
})
studentRouter.get('/add', (req, res) => {

})

module.exports = studentRouter