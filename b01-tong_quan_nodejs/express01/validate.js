const Joi = require('joi');

const createUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    age: Joi.number()
        .max(100)
        .min(3).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});



const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const middlewareValidate = (schema) => {
    return (
        req, // object chứa thông tin từ client 
        res, // obj chứa chức năng phản hồi từ server về client
        next, // function gọi để chuyển logic sang cb sau đó 
    ) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json(error.details)
        }
        // req đúng quy cách format 
        next();
    }
};

const userCreateValidate = (
    req, // object chứa thông tin từ client 
    res, // obj chứa chức năng phản hồi từ server về client
    next, // function gọi để chuyển logic sang cb sau đó 
) => {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
        res.status(400).json(error.details)
    }
    // req đúng quy cách format 
    next();
}



module.exports = {
    createUserSchema,
    middlewareValidate,
    userCreateValidate,
    loginSchema,
}





