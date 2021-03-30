const express = require('express')
let userRouter = express.Router();

const controller =  (req, res) => {
    // console.log(req);
    res.json({dd: 'dd'})
} 

userRouter.get('/all', controller);

module.exports = userRouter;