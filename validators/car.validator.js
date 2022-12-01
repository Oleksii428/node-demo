const Joi = require("joi");

module.exports = {
	createCarValidator: Joi.object({
		model: Joi.string().min(2).max(30).required(),
		year: Joi.number().integer().max(2022).required(),
		price: Joi.number().min(100).required(),
		_user_id: Joi.string().min(1).max(100).optional()
	})
};