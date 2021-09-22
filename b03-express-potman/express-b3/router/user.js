const express = require('express')
const { getAllUser, queryUser, addUser, deleteUserByID } = require('../model/user');

let userRouter = express.Router();

const controller = (req, res) => {
    console.log(req.params)
    res.send('get method' + req.params.user)
}
// 
userRouter.get('/', async (req, res) => {
    try {
        const { name = '', age = '' } = req.query || {};
        // lấy toàn bộ user 
        if (!name && !age) {
            console.log(req.query, 'query')
            const result = await getAllUser();
            res.json(result);
            return 1;
        } else {
            const result = await queryUser({ name, age });
            res.json(result);
            return 1;
        }
        // 
    } catch (err) {
        console.log('error get user', err);
        res.status(500).json({
            msg: err
        })
    }
});

userRouter.post('/', async (req, res) => {
    try {

        const body = req.body;
        console.log('post body', body)
        await addUser(body);
        res.json({
            msg: 'Thêm mới user thành công'
        })

    } catch (err) {
        console.log('error get user', err);
        res.status(500).json({
            msg: err
        })
    }
});

userRouter.patch('/', (req, res) => {
    res.send('patch method')
});

userRouter.put('/', (req, res) => {
    res.send('put method')
});

userRouter.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await deleteUserByID(userId);
        res.status(result.status).json({
            msg: result.msg
        })

    } catch (err) {
        console.log('error get user', err);
        res.status(500).json({
            msg: err
        })
    }
});

module.exports = userRouter;