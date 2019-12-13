const Joi = require('@hapi/joi')

// Register validation

export const registerValidation = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        nickname: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    });
    return schema.validate(data)
};

// Login validation

export const loginValidation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    });
    return schema.validate(data)
};



