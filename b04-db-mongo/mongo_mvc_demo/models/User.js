const Base = require('./base');
const Model = require('../entities') 
// const errorMessage = require('../config').errorMessage


class User extends Base {
    constructor(model) {
        super(model)
    }

    async getUserByID(id) {
        const data = await Model.User.find({});
        // const data = await Model.Manager.insertMany({name: 'duc2', role: 'admin', asdfadf: 'asfsdfasdfafd'});
        return data
    }

}

module.exports = new User(Model.User)