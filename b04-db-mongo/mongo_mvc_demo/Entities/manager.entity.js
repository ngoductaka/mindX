'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const manager = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
});

const Manager = mongoose.model('Managers', manager)

module.exports = Manager
