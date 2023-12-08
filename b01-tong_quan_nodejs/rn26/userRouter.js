const { Router } = require("express");
const {
    // readAll,
    createNewUser,
    // updateUser,
    deleteUser,
    replaceUser,
    userLogin,
} = require('./fs');

const { verifyUser, generateToken } = require('./middleware');
const { cryptPassword } = require('./helper');
const { readAll, createUser, updateUser } = require('./user_schema');
const commentRouter = Router();
// request  

commentRouter.get(
    '/', // path
    async (
        req, // 
        res
    ) => {
        // data gửi kèm: params, query, body(body-parser) lấy từ req 
        // query, param : dữ liệu trên đường dẫn
        const query = req.query;
        const params = req.params;
        // value => string
        // console.log('params and query:', { params, query });
        const nameRex = new RegExp(query.name, 'i');
        const data = await readAll({
            name: nameRex,
        })
        res.status(200).json(data);
    });
commentRouter.get(
    '/:userId', // path
    async (
        req, // 
        res
    ) => {
        // data gửi kèm: params, query, body(body-parser) lấy từ req 
        // query, param : dữ liệu trên đường dẫn
        const query = req.query;
        const { userId } = req.params;
        // value => string
        // console.log('params and query:', { params, query });
        const nameRex = new RegExp(query.name, 'i');
        const data = await readAll({
            _id: userId
        })
        res.status(200).json(data);
    });

// validate 
// sinh userId
commentRouter.post('/', async (req, res) => {
    const body = req.body;
    await createUser(body);
    res.json({
        message: 'create user success',
    });
    // res.send('<h2 style="font-size: 30px; color: blue">hello wiki</h2>');
});

commentRouter.patch('/:userId', verifyUser, async (req, res) => {
    try {
        const { userId } = req.params;
        const body = req.body;
        await updateUser(userId, body);
        res.status(300).json({
            message: 'replace user success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }

});

// 
commentRouter.delete('/:userID', verifyUser, (req, res) => {
    const { userID } = req.params;
    deleteUser(userID);
    res.json({
        message: 'delete user success',
    });

});

commentRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // xác thực người dùng
        const user = await userLogin(username, password);
        // 
        var token = generateToken(user);

        res.json({
            data: user,
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
commentRouter.post('/register', async (req, res) => {
    try {
        const {
            password,
            ...body
        } = req.body;
        
        const hashPassword = await cryptPassword(password);


        const user = await createUser({...body, password: hashPassword});
        res.json({
            message: 'register success',
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

commentRouter.patch('/', verifyUser, async (req, res) => {
    try {
        // xác thực người dùng bănq cách xác thực token
        // update 
        console.log('req.user', req.user);
        const userId = req.user.id;
        const body = req.body;
        await updateUser(userId, body);
        res.json({
            message: 'update user success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});

module.exports = commentRouter;