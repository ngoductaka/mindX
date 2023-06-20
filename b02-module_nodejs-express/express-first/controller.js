
const { createNewRecord, findUser, readAll } = require('./model');
const jsonwebtoken = require('jsonwebtoken');
const KEY = "supper_secret_key"
// controller.js
const createUser = async (
    req, // request object
    res // response object 
) => {
    try {
        // { params, query, body} = req 
        // lấy data từ client (request)
        const payload = req.body;
        // xử lý yêu cầu từ client 
        // gọi đến controller 
        const result = await createNewRecord(payload);
        // response 
        res.json({
            data: result
        })
    } catch (err) {
        res.status(500).json({
            data: err
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        // b01: lấy dữ liệu từ request và validate

        // { params, query, body} = req 

        const payload = req.body;

        if (!payload.name) {
            res.status(404).json({
                msg: 'name is required'
            })
        }

        if (!payload.pass) {
            res.status(404).json({
                msg: 'pass is required'
            })
        }




        // b02 : xử lý yêu cầu

        // tìm user ( name, pass ) trong database 
        const userFounded = await findUser(payload.name, payload.pass);
        // nếu có  => tạo token và trả về client
        if (userFounded) {
            // sinh token va tra ve
            const {
                pass,
                ...dataReturn
            } = userFounded;
            const token = jsonwebtoken.sign(dataReturn, KEY);
            
            res.json({
                token,
                user: dataReturn,
            })
        } else {
            // ko có thì trả 400 => user not found
            res.status(400).json({
                msg: 'user not found'
            })
        }


        // bo3 trả về 
        req.json({

        })

    } catch (err) {

    }
}

const getAll = async(req, res) => {
    try {
        const allUser = await readAll();
        res.json({
            data: allUser
        });
    } catch (err) {

    }
}

const getOne = async(req, res) => {
    try {
        const allUser = await readAll();
        const userFounded = allUser.find(({id}) => id === req.user.id)
        if(userFounded) {
            res.json({
                data: userFounded
            });
        } else {
                  
        res.status(400).json({
            msg: 'user not found'
        });
        }
  
    } catch (err) {

    }
}


module.exports = {
    createUser,
    handleLogin,
    getAll,
    getOne,
}