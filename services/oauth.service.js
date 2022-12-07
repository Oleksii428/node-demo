const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
	ACCESS_SECRET,
	CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
	FORGOT_PASSWORD_ACTION_TOKEN_SECRET, REFRESH_SECRET
} = require("../configs/config");
const ApiError = require("../errors/ApiError");
const {tokenTypesEnum, tokenActionsEnum} = require("../enums");
const {OAuth} = require("../dataBases");

module.exports = {
	findOne: async (filter) => OAuth.findOne(filter),
	hashPassword: (password) => bcrypt.hash(password, 10),
	comparePasswords: async (hashPassword, password) => {
		const isPasswordsSame = await bcrypt.compare(password, hashPassword);

		if (!isPasswordsSame) {
			throw new ApiError("Wrong email or password", 400);
		}
	},
	generateAccessTokenPair: (dataToSign = {}) => {
		const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: "10m"});
		const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: "30d"});

		return {
			accessToken,
			refreshToken
		};
	},
	generateActionToken: (actionType, dataToSign = {}) => {
		let secretWord = "";

		switch (actionType) {
			case tokenActionsEnum.CONFIRM_ACCOUNT:
				secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
				break;
			case tokenActionsEnum.FORGOT_PASSWORD:
				secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
				break;
		}

		return jwt.sign(dataToSign, secretWord, {expiresIn: "7d"});
	},
	checkToken: (token = "", tokenType = tokenTypesEnum.accessToken) => {
		try {
			let secret = "";

			if (tokenType === tokenTypesEnum.accessToken) secret = ACCESS_SECRET;
			else if (tokenType === tokenTypesEnum.refreshToken) secret = REFRESH_SECRET;

			return jwt.verify(token, secret);
		} catch (e) {
			throw new ApiError("Token not valid", 401);
		}
	},
	checkAccessToken: (token, actionType) => {
		try {
			let secretWord = "";

			switch (actionType) {
				case tokenActionsEnum.CONFIRM_ACCOUNT:
					secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
					break;
				case tokenActionsEnum.FORGOT_PASSWORD:
					secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
					break;
			}

			jwt.verify(token, secretWord);
		} catch (e) {
			throw new ApiError("Token not valid", 401);
		}
	}
};