const jwt = require('jsonwebtoken');
const private_key = 'sadfasbkdfajshdfsjdfwieru8wrqw9e';

const createToken = (data = { foo: 'bar' }) => jwt.sign(data, private_key);

const verifyToken = () => {
    return new Promise((res, rej) => {
        jwt.verify(token, private_key, function (err, decoded) {
            if (err) {
                rej(err)
            }
            res(decoded.foo) // bar
        });

    })
}

module.exports = {
    createToken, verifyToken
}