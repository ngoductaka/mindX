require('dotenv').config();
const Comments = require('../Entities/comment.entity')

const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage

async function test(req, res) {
    try {   
        const data = await Comments.find({}).limit(20)  
        console.log('ddd', data)
        res.json(data)

    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage( ["err in USER LOGIN", err]))
    }
}

module.exports = { test }