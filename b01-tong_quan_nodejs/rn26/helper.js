var bcrypt = require('bcrypt');

const cryptPassword = function (password) {
    return bcrypt
        .genSalt(10)
        .then(salt => {
            console.log('Salt: ', salt)
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            console.log('Hash: ', hash)
            return hash;
        })
        .catch(err => console.error(err.message))
};

const comparePassword = function (plainPass, hashword) {
    return bcrypt.compare(plainPass, hashword);
};


module.exports = {
    cryptPassword,
    comparePassword
}