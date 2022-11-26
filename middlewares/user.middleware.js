const {userService} = require("../services");
const ApiError = require("../errors/ApiError");

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

			if (userInfo.name.length < 3 || typeof userInfo.name !== "string") {
				throw new ApiError("wrong name", 400);
			}

			if (userInfo.age < 0 || Number.isNaN(+userInfo.age)) {
				throw new ApiError("wrong age", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyUpdateValid: async (req, res, next) => {
		try {
			const {name, age} = req.body;

			if (name && (name.length < 3 || typeof name !== "string")) {
				throw new ApiError("wrong name", 400);
			}

			if (age && (age < 0 || Number.isNaN(+age))) {
				throw new ApiError("wrong age", 400);
			}
			next();
		} catch (e) {
			next(e);
		}
	},
	isIdValid: (req, res, next) => {
		try {
			const {userId} = req.params;

			// if (userId < 0 || Number.isNaN(+userId)) {
			// 	throw new ApiError("invalid id", 404);
			// }

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