const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connect } = require('./mongodb_connect');
// router
const commentRouter = require('./commentRouter');
const useRouter = require('./userRouter');
// middleware
const { generateToken } = require('./middleware');
// model 
const { login } = require('./user_schema');
// DB connect
connect();
const app = express();
// config cors
cors(app);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', useRouter);

app.use('/comment', commentRouter);
// 
app.post('/login', async (req, res) => {
    console.log('req.body', req.body);
    const { username, password } = req.body;
    const user = await login(username, password);
    if(user) {
        // tạo token
        const token = generateToken(user);
        return res.json({
            data: user,
            token: token,
        });
    } else {
        return res.status(400).json({
            message: 'login fail',
        });
    }
});

app.listen(3000, () => {
    console.log(`Example app listening on: ${3000}`)
})