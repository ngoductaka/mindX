const { login: userLogin, createUser } = require('../model/user.model');
const { comparePassword, cryptPassword } = require('../helper/bcrypt');
const { generateToken } = require('../middleware/auth.middleware');

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await userLogin(name);
        if (user) {
            const isCorrectPassword = await comparePassword(password, user.password);
            if (!isCorrectPassword) {
                return res.status(400).json({
                    message: 'wrong password',
                });
            }
            console.log('isCorrectPassword', isCorrectPassword);
            // tạo token
            const token = generateToken(user);
            const { password: dndFake, __v, ...rest } = user;
            return res.json({
                data: rest,
                token: token,
            });
        } else {
            return res.status(400).json({
                message: 'user name not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

const register = async (req, res) => {
    try {
        const {
            password,
            ...body
        } = req.body;
        
        const hashPassword = await cryptPassword(password);
        const user = await createUser({...body, password: hashPassword});
        res.json({
            message: 'register success',
            data: user,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }

}
module.exports = {
    login,
    register
}
