const User = require('../schema/user.schema');
const baseModel = require('./base.model');
const handlePassword = require('../helpers/handle_password.js');

class UserModel extends baseModel {
    async login({ name, password }) {
        const user = await User.findOne({ name })
        if (!user) throw new Error('User not found');
        const isPasswordMatch = await handlePassword.comparePassword(password, user.password)
        if (isPasswordMatch) {
            return user;
        } else {
            throw new Error('Invalid password');
        }
    }

}

module.exports = new UserModel(User)