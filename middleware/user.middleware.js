const {fileServices} = require("../services");
const ApiError = require("../error/ApiError");

module.exports = {
	isUserExists: async (req, res, next) => {
		try {
			const {userId} = req.params;

			const users = await fileServices.reader();

			const user = users.find((u) => u.id === +userId);

			if (!user) {
				throw new ApiError(`user width id ${userId} not found`, 404);
			}

			req.user = user;
			req.users = users;

			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyValidCreate: async (req, res, next) => {
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
	isBodyValidUpdate: async (req, res, next) => {
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

			if (userId < 0 || Number.isNaN(+userId)) {
				throw new ApiError("invalid id", 404);
			}
			next();
		} catch (e) {
			next(e);
		}
	}
};