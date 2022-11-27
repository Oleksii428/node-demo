const {userService} = require("../services");
const ApiError = require("../errors/ApiError");
const commonValidators = require("../validators/common.validators");
const {userValidator, updateUserValidator} = require("../validators/user.validator");

module.exports = {
	isUserExists: async (req, res, next) => {
		try {
			const {userId} = req.params;

			const user = await userService.getOneByParams({_id: userId});

			if (!user) {
				throw new ApiError(`user width id ${userId} not found`, 404);
			}

			req.user = user;

			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyCreateValid: async (req, res, next) => {
		try {
			const userInfo = req.body;
			const validate = userValidator.validate(userInfo);

			if (validate.error) {
				throw new ApiError(validate.error.message, 400);
			}

			req.body = validate.value;

			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyUpdateValid: async (req, res, next) => {
		try {
			const updateInfo = req.body;
			const validate = updateUserValidator.validate(updateInfo);

			if (validate.error) {
				throw new ApiError(validate.error.message, 400);
			}

			req.body = validate.value;

			next();
		} catch (e) {
			next(e);
		}
	},
	isMongoIdValid: (req, res, next) => {
		try {
			const {userId} = req.params;

			const validate = commonValidators.idValidator.validate(userId);

			if (validate.error) {
				throw new ApiError(validate.error.message, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isEmailUnique: async (req, res, next) => {
		try {
			const {email} = req.body;

			if (!email) {
				throw new ApiError("Email is required", 400);
			}

			const user = await userService.getOneByParams({email});

			if (user) {
				throw new ApiError("User with this email is already exists", 409);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};