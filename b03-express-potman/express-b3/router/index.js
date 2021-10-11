const express = require('express');
// 
var jwt = require('jsonwebtoken');
const userRouter = require('./user');
const loginRouter = require('./login');
// 
const app = express();

const private_key = 'Aasdfakdbehe345234523452345';

const middleware = (req, res, next) => {
    try {
        // verify a token symmetric - synchronous
        console.log('req', req.headers.authorization);
        const [_, token] = req.headers.authorization.split(' ')

        var decoded = jwt.verify(token, private_key);
        console.log({decoded})
        // res.json(decoded)
        next();

    } catch (err) {
        res.status(403).json({
            msg: "token khong dung"
        })

    }
}
// 
app.use('/user', middleware, userRouter)
app.use('/login', loginRouter)
// app.use('/product', middleware, userRouter)


module.exports = app
