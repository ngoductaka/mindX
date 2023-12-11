const Joi = require('joi');

const patchUserSchema = Joi.object({
    // name: Joi.string()
    //     .min(3)
    //     .max(30)
    //     .required(), // key: type value 
    age: Joi.number().integer().min(6).max(100),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'string.email': `Email không đúng định dạng cần có @ và domain (.com hoặc .net)`,
          }),
    // password: Joi.string().min(6).max(10).required(),
    role: Joi.string().valid('admin', 'user', 'teacher', 'student'),
    avatar: Joi.string(),
    tags: Joi.array().items(Joi.string()),
});

module.exports = {
    patchUserSchema
}