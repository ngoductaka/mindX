const Users = require('./connect').Users
const randtoken = require('rand-token');
const errorMessage = require('../config').errorMessage

function getUser(id = null) {
    const query = id ? { "_id": id } : {};

    let userById = new Promise((res, rej) => {
        Users.findOne(query)
            .select('email username bio image')
            .exec((err, data) => {
                if (err) rej(err)
                res(data)
            })
    })

    return userById;
}

function login(data) {
    let query = { "email": data.email, "password": data.password };

    let userLogin = new Promise((res, rej) => {
        Users.findOne(query)
            .select('email username bio image')
            .exec((err, data) => {
                if (err) rej(err)
                res(data)
            })
    })

    return userLogin;
}

function editUser(data, userID) {
    let query = { "_id": userID };

    let { email, username, password, image, bio } = data;
    let upList = { email, username, password, image, bio }
    let up = {}
    for (const key in upList) {
        if (upList[key] !== undefined) up[key] = upList[key]
    }

    let userUpdate = new Promise((res, rej) => {
        Users.update(query, { $set: up })
            .exec((err, data) => {
                if (err) rej(err)
                else if (1 === data.n) {
                    res(getUser(userID))
                }
                else {
                    rej(errorMessage("update fail"))
                }
            })
    })
    return userUpdate
};

function register({ email, username, image, password, bio }) {
    const newUser = new Users({
        "email": email,
        "username": username,
        "image": image,
        "password": password,
        "bio": bio
    });

    let createUser = new Promise((res, rej) => {
        newUser.save((err, data) => {
            if (err) return rej(err);
            res(data)
        })
    })

    return createUser;
};

module.exports = { getUser, register, login, editUser }