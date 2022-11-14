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

app.use(
    '/nodejs/nodejs09-10', // đường dẫn 
    (
        req,// request ( yêu cầu cái gì )
        res // res ( trả về thông tin đc yêu cầu  )
    ) => { // xử lý yêu cầu và trả lại kết quả 
        console.log(' nhận đc thông tin từ client ');
        // res.send(`<p style="color: red; font-size: 30px">  thuyết trình đánh giá sản phẩm  </p>`)
        res.status(400).json({
            token: 'token name',
            name: 'dnd',
            age: 222,
        })
    }
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

