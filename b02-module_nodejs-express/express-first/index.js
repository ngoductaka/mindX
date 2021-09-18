const express = require('express')
const app = express()
// https://runkit.com/
const port = 3000;
// config static file
app.use(express.static('anh'))

app.get('/user/:id', (req, res) => {
    res.send('Hello asdfasdfasfdas!')
})

//  các method trên http


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})