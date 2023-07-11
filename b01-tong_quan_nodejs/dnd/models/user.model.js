const User = require('../schema/user.schema');
const baseModel = require('./base.model');
const moment = require('moment');
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
    async query(query = {}, sort) {
        try {


            const { limit, skip } = query;
            console.log('limit, skip', limit, skip);
            const rex = new RegExp(query.name, 'i');
            const queryObject = {
                name: rex,
                // birthday: {}
                // birthday: {
                //     $ne: null,
                // }
            }
            if (query.afterDay) {
                queryObject.birthday['$gte'] = moment(query.afterDay, 'DD-MM-YYYY');
            }
            if (query.beforeDay) {
                queryObject.birthday['$lte'] = moment(query.beforeDay, 'DD-MM-YYYY');
            }
            // if (query.afterMonth) {
            //     queryObject.birthday['$gte'] = moment(query.afterMonth, 'MM-YYYY');
            // }

            const data = await User.find(queryObject).skip(+skip).limit(+limit).sort({
                name: 1
            });
            return data;
        } catch (error) {
            console.log('ddddd');
        }
    }

}

module.exports = new UserModel(User)