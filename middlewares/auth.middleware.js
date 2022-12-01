const {authValidator} = require("../validators");
const {oauthService} = require("../services");
const {OAuth} = require("../dataBases");
const {tokenTypeEnum} = require("../enums");
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
	},
	checkAccessToken: (req, res, next) => {
		try {
			const accessToken = req.get("Authorization");

			if (!accessToken) {
				throw new ApiError("No token", 401);
			}

			oauthService.checkToken(accessToken);

			const tokenInDB = OAuth.findOne({accessToken});

			if (!tokenInDB) {
				throw new ApiError("No token in data base", 401);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	checkRefreshToken: (req, res, next) => {
		try {
			const refreshToken = req.get("Authorization");

			if (!refreshToken) {
				throw new ApiError("No token", 401);
			}

			oauthService.checkToken(refreshToken, tokenTypeEnum.refreshToken);

			const tokenInfo = OAuth.findOne({refreshToken});

			if (!tokenInfo) {
				throw new ApiError("No token in data base", 401);
			}

			req.tokenInfo = tokenInfo;
			next();
		} catch (e) {
			next(e);
		}
	}
};