import * as Joi from '@hapi/joi';
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

// userUpdate validation

export const userUpdValidation: any =  (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        nickname: Joi.string().min(3) ,
        surname: Joi.string().min(3) ,
        sex: Joi.string().min(4) ,
        city: Joi.string().min(2) ,
        country: Joi.string().min(2) ,
        age: Joi.number().max(3).min(1)
    })
    return schema.validate(data)
};



