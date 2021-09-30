'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comments = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    text: {
        type: String
    },
});

const Comments = mongoose.model('Comments', comments)

module.exports = Comments
