const Joi = require("joi")
const authUserSchema = Joi.object({
 firstname: Joi.string().required(),
 lastname: Joi.string().required(),
 email: Joi.string().email().required().lowercase(),
 password: Joi.string().required().min(8)
})

const authTaskSchema = Joi.object({
 description: Joi.string().required(),
 completed: Joi.boolean().required()
})

module.exports = {
 authUserSchema,
 authTaskSchema
}