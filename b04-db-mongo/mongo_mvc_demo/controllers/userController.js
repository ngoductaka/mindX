require('dotenv').config();
const modelUser = require('../models/User');
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage

async function login(req, res) {
    console.log('=====')
    let { email, password } = req.body.user;
    if (undefined === email || undefined === password) return res.status(401).json(errorMessage(["email, password is require"]))
    try {     
        let user = await modelUser.login({ email, password })
        if(!user) res.status(402).json(errorMessage([" email or password wrong"]))
        else{
            let token = {"id": user._doc._id }
            let key = jwt.sign(token, process.env.JWT_KEY);
            let userSend = { ...user._doc, "token": key }
            res.json({ "user": userSend })
        }
    }
    catch (err) {
        res.status(402).json(errorMessage( ["err in USER LOGIN", err]))
    }
}

async function register(req, res) {
    let { email, username, password, bio, image } = req.body.user;
    if (undefined === email || undefined === password || undefined === username) return res.status(401).json(errorMessage(["username, email, password is require"]))
    try {
        let user = await modelUser.register({ email, username, password, bio, image })
        res.json({ user })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in USER register", err]))
    }
}

async function getUser(req, res) {
    try{
        let user = await modelUser.getUser(req.userId)
        res.json({ user })
    }
    catch(err){
        res.status(402).json(errorMessage(["err in GETUSER ", err]))
    }
}

async function updateUser(req, res) {
    try{
        let { email, username, password, image, bio } = req.body.user;
        let user = await modelUser.editUser({ email, username, password, image, bio }, req.userId);
        res.json(user)
    }
    catch(err){
        res.status(402).json(errorMessage(["err in updateUser controller",err]))
    }
}

module.exports = { getUser, login, register, updateUser }