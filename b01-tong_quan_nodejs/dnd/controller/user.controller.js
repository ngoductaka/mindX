const privateKey = 'asdfkasbdfjhasvdfjhasvdfjasdf';

var jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const handlePassword = require('../helpers/handle_password');
const userModel = require('../models/user.model');

const createUser = async (req, res) => {
    const { password, ...rest } = req.body;
    const hashPassword = await handlePassword.cryptPassword(password);
    const user = await UserModel.create({
        ...rest,
        password: hashPassword
    });
    res.status(201).json({
        message: 'User created successfully',
    });
}
const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await UserModel.login({ name, password });
        const dataToken = {
            _id: user._id,
            name: user.name,
        }
        console.log(user)
        if (!user) {
            res.status(404).json({
                message: 'Invalid user name or password'
            })
            return;
        }
        const token = jwt.sign(
            dataToken, // data to be signed
            process.env.KEY_JWT, // secret key
            { expiresIn: '1h' },// expiration time
        )
        res.status(200).json({
            message: 'User logged in successfully',
            token
        })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).json({
            message: 'Internal server error',
            data: error.message
        })
    }
}

const getCurrentUser = async (req, res) => {
    const user = await userModel.findOne({ _id: req.user._id }, 'name _id birthday');
    res.status(200).json(user)
}

module.exports = {
    createUser,
    login,
    getCurrentUser
}