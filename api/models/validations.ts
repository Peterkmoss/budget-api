import Joi from '@hapi/joi'

export const registerValidation = (data: any) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .min(8)
            .max(50)
            .required(),
        repeat_password: Joi.ref('password')
    })
    return schema.validate(data)
}