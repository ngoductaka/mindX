const privateKey = 'asdfkasbdfjhasvdfjhasvdfjasdf';

var jwt = require('jsonwebtoken');
const moment = require('moment');

const UserModel = require('../models/user.model');
const handlePassword = require('../helpers/handle_password');
const userModel = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashPassword = await handlePassword.cryptPassword(password);
        console.log({
            ...rest,
            password: hashPassword
        }, 'ddddd')
        const user = await UserModel.create({
            ...rest,
            password: hashPassword
        });
        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        console.log(error, 'error')
        res.status(500).json({
            message: 'Internal server error',
            data: error.message
        })
    }
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


const updateUser = async (req, res) => {
    const dataUpdate = {
        ...req.body,
        birthday: moment(req.body.birthday, "DD/MM/YYYY")
    }
    await userModel.findOneAndUpdate({ _id: req.user._id }, dataUpdate);
    const data = await UserModel.findOne({ _id: req.user._id }, '-password -__v');
    res.status(200).json(data)
}
const deleteUser = async (req, res) => {
    const result = await userModel.delete({ _id: req.user._id });
    res.json(result)
}

const getUsers = async (req, res) => {
    const result = await UserModel.query(req.query);
    res.json(result)
}


module.exports = {
    createUser,
    login,
    getCurrentUser,
    updateUser,
    deleteUser,
    getUsers,
}