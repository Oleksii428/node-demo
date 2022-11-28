const Joi = require("joi");

const regex = require("../configs/regex");

module.exports = {
	createUserValidator: Joi.object({
		name: Joi.string().min(2).max(20).required().default(""),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
		password: Joi.string().regex(regex.PASSWORD).required(),
		age: Joi.number().integer().min(1).max(120)
	}),
	updateUserValidator: Joi.object({
		name: Joi.string().min(2).max(20).default("").optional(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim().optional(),
		age: Joi.number().integer().min(1).max(120).optional()
	}),
};
