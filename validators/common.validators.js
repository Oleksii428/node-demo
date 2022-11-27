const Joi = require("joi");
const regex = require("../configs/regex");

module.exports = {
	idValidator: Joi.string().regex(regex.MONGO_ID)
};