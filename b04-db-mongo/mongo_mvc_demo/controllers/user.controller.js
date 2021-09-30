const Model = require('../models')

class User {
    constructor() {

    }
    async getAllUser(req, res) {
        try {
            const result = await Model.User.findMany({})
            
        } catch (err) {

        }
    }
}

module.exports = new User();