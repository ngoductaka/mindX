const Joi = require('joi');

// 

const middlewareValidate = (schema) => {
    return (
        req, // object chứa thông tin từ client 
        res, // obj chứa chức năng phản hồi từ server về client
        next, // function gọi để chuyển logic sang cb sau đó 
    ) => {
        const { body, params, query } = req;
        const { error } = schema.validate({ body, params, query });
        if (error) {
            res.status(400).json(error.details);
            return;
        }
        // req đúng quy cách format 
        next();
    }
};

// 

const updateUserSchema = Joi.object({
    body: Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        note: Joi.string(),
        birthday: Joi.string(),
        phone: Joi.string()
            .regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
            .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
        address: Joi.string(),
        role: Joi.string().valid('user', 'admin', 'client', 'superadmin'),
    }),
    // 
    query: Joi.object({}),
    params: Joi.object({}),
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
    middlewareValidate,
    updateUserSchema
}





