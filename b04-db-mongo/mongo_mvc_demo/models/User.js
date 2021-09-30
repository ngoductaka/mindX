const Base = require('./base');
const Model = require('../entities') 
// const errorMessage = require('../config').errorMessage


class User extends Base {
    constructor(model) {
        super(model)
    }

    async getUserByID(id) {
        const data = await Model.User.find({});
        return data
    }

}

module.exports = new User(Model.User)