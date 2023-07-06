const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    try {
        const [_, token] = req.headers.authorization.split(" ")
        const userData = jwt.verify(token, process.env.KEY_JWT);
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'invalid token',
            err: err
        })
    }
};