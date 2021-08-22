'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
})

const Users = mongoose.model('Users', users)

module.exports = Users
