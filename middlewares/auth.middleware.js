const authValidator = require("../validators/auth.validator");
const ApiError = require("../errors/ApiError");
const {oauthService} = require("../services");
const Oauth = require("../dataBases/Oauth");
const {tokenTypeEnum} = require("../enums");

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

			const tokenInDB = Oauth.findOne({accessToken});

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

			const tokenInfo = Oauth.findOne({refreshToken});

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