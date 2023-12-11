const { readAll, updateUser: handleUpdateUser } = require('../model/user.model');
const getListUser = async (req, res) => {
    try {
        const users = await readAll();
        res.json({
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const body = req.body;
        await handleUpdateUser(userId, body);
        res.status(300).json({
            message: 'replace user success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}


module.exports = {
    getListUser,
    updateUser,
}
