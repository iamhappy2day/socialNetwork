const Joi = require('@hapi/joi')

// Register validation

const registerValidation = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        nickname: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    });
    return schema.validate(data)
};

// Login validation

const loginValidation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    });
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


