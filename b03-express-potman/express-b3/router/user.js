const express = require('express')
let userRouter = express.Router();

const controller = (req, res) => {
    console.log(req.params)
    res.send('get method' + req.params.user)
}

userRouter.get('/all/:user', (req, res) => {
    console.log(req.params, req.query) // ?name1=val&name2=sdaf&asdf
    const obj = req.query;

    res.send('get method: ' + req.real_name)
});

userRouter.post('/:user', (req, res) => {
    console.log(req.headers)
    const obj = req.query;

    res.send('post method: '+ req.params.user)
});

userRouter.patch('/', (req, res) => {
    res.send('patch method')
});

userRouter.put('/', (req, res) => {
    res.send('put method')
});

userRouter.delete('/', (req, res) => {
    res.send('delete method')
});

module.exports = userRouter;