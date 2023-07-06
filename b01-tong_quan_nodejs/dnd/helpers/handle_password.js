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
// cryptPassword('dndd');

// comparePassword('dndd','$2b$10$ekla0hr4sDlW8FSo2Rl.i.p82YnU1Q4N6Kxmr3s.TuBsAe3w0I/Ze', (err, isPasswordMatch) => {
//     console.log(err, isPasswordMatch)
// })
