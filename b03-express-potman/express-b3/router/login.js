const express = require('express')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

let loginRouter = express.Router();
const private_key = 'Aasdfakdbehe345234523452345';
// const GenPass = (password) => {
//     return new Promise((res, rej) => {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 rej(err)
//                 return err;
//             }
//             bcrypt.hash(password, salt, function (err, hash) {
//                 if (err) rej(err)
//                 return res(hash);
//             });
//         });

//     })
// };

// const comparePassword = (plainPass, hashword, callback) => {
//     return new Promise((res, rej) => {
//         bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
//             return err == null ? res(isPasswordMatch) : rej(err);
//         });

//     })
// };


const loginController = (body) => {
    const { user_name = '', password = '' } = body;

    if (user_name == 'ngoc_duc' && password == 'Aa123456') { // check tài khoản trong database
        var token = jwt.sign({ user_name }, private_key);
        return {
            status: 200,
            data: {
                token,
                user_name,
                age: 12,
            }
        }
    } else {
        return {
            status: 400,
            data: {
                msg: "Vui long kiem tra lai thong tin dang nhap",
            }
        }
    }
}

loginRouter.post('/', async (req, res) => {
    try {
        const body = req.body;
        console.log('body', body)
        const result = loginController(body);
        res.status(result.status).json(result.data)
        // const result = await loginController(body)
        // console.log(result)

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = loginRouter;