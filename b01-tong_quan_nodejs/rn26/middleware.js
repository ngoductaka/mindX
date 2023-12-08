

const PRIVATE_KEY = 'adskjfabsfjkkw4u9283fbwecbshcbf94y34r3efb'
const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    return jwt.sign(
        data, // body 
        PRIVATE_KEY, // footer chứa chữ ký
        // { algorithm: 'RS256', expiresIn: '1h' } // header chứa thuật toán mã hóa
    );
}

const verifyUser = (req, res, next) => {
    try {
        if (!req?.headers?.authorization) {
            res.status(401).json({
                message: 'unauthorization',
            });
            return;
        }
        console.log('req.headers.authorization', req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(
            token, // token
            PRIVATE_KEY // private key
        );
        console.log('decoded', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
}

module.exports = {
    verifyUser,
    generateToken,
}