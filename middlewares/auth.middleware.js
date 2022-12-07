const {authValidator} = require("../validators");
const {oauthService, actionTokenService} = require("../services");
const {tokenTypesEnum, tokenActionsEnum} = require("../enums");
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
	checkAccessToken: async (req, res, next) => {
		try {
			const accessToken = req.get("Authorization");

			if (!accessToken) {
				throw new ApiError("No token", 401);
			}

			oauthService.checkToken(accessToken);

			const tokenInfo = await oauthService.findOne({accessToken});

			if (!tokenInfo) {
				throw new ApiError("No token in data base", 401);
			}

			req.tokenInfo = tokenInfo;

			next();
		} catch (e) {
			next(e);
		}
	},
	checkRefreshToken: async (req, res, next) => {
		try {
			const refreshToken = req.get("Authorization");

			if (!refreshToken) {
				throw new ApiError("No token", 401);
			}

			oauthService.checkToken(refreshToken, tokenTypesEnum.refreshToken);

			const tokenInfo = await oauthService.findOne({refreshToken});

			if (!tokenInfo) {
				throw new ApiError("No token in data base", 401);
			}

			req.tokenInfo = tokenInfo;
			next();
		} catch (e) {
			next(e);
		}
	},
	checkActionToken: async (req, res, next) => {
		try {
			const actionToken = req.get("Authorization");

			if (!actionToken) {
				throw new ApiError("No token", 401);
			}

			oauthService.checkAccessToken(actionToken, tokenActionsEnum.FORGOT_PASSWORD);

			const tokenInfo = await actionTokenService.findOne({
				token: actionToken,
				tokenType: tokenActionsEnum.FORGOT_PASSWORD
			});

			if (!tokenInfo) {
				throw new ApiError("Something wrong???!!!", 401);
			}

			tokenInfo.populate("_user_id");

			req.user = tokenInfo._user_id;

			next();
		} catch (e) {
			next(e);
		}
	}
};