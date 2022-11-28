const authValidator = require("../validators/auth.validator");
const ApiError = require("../errors/ApiError");

module.exports = {
	isBodyValid: async (req, res, next) => {
		try {
			const validate = authValidator.loginValidator.validate(req.body);

			if (validate.error) {
				throw new ApiError(validate.error.message, 404);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};