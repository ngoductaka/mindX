const { Router } = require('express');
const userRouter = Router();

userRouter.post('/get-user/:userId', (req, res) => {
    const { query, params, body } = req;
    // ?name=nodejs&age=90
    console.log({ query, params, body })
    // handle logic
    res.send('heloo router');
});

// 1. method
// 2. path
// 3. data

// 3.1 data from path
//  3.1.1 params
//  3.1.2 query

// 3.2 data from payload

module.exports = userRouter;
