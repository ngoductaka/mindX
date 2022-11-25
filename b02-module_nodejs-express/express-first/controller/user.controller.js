
const userModel = require('../model/user.model');

const create = async (req, res) => {
    const payload = req.body;
    // validate 

    const dataUser = await userModel.addNew({
        ...payload,
        id: new Date().valueOf()
    });

}


module.exports = {
    create
}