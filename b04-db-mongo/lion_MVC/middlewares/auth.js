require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function required(req, res, next) {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            let token = req.headers.authorization.split(" ")[1]
            const decoded = await jwt.verify(token, process.env.JWT_KEY);
            req.userId = decoded.id;//???????
            if (!req.userId) {
                res.status(401).json({
                    error: {
                        Body: ['token have troble']
                    }
                });
            } else {
                next();
            }
        }
        catch (err) {
            res.status(401).json({
                error: {
                    Body: ['Failed to authenticate token!']
                }
            });
        }
    } else {
        return res.status(401).json({
            error: {
                Body: ['No token!']
            }
        });
    }
}

async function options(req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1]
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;//???????
        next();
    }
    catch (err) {
        next();
    }
}

module.exports = { required, options }