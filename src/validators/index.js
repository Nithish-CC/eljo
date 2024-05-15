const Joi = require("joi");

const EmployeeSignupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string()
        .length(10)
        .pattern(/[6-9]{1}[0-9]{9}/)
        .required(),
    departmentId: Joi.number().required()
});


const EmployeeUpdateSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string()
        .length(10)
        .pattern(/[6-9]{1}[0-9]{9}/)
        .required(),
    departmentId: Joi.number().required(),
    profileImage: Joi.string(),
    id:Joi.number().required()
});
module.exports = {
    EmployeeSignupSchema,
    EmployeeUpdateSchema
}