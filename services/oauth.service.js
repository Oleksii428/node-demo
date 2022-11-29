const jwt = require("jsonwebtoken");

const configs = require("../configs/config");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/ApiError");
const {tokenTypeEnum} = require("../enums");

module.exports = {
	hashPassword: (password) => bcrypt.hash(password, 10),
	comparePasswords: async (hashPassword, password) => {
		const isPasswordsSame = await bcrypt.compare(password, hashPassword);

		if (!isPasswordsSame) {
			throw new ApiError("Wrong email or password", 400);
		}
	},
	generateAccessTokenPair: (dataToSign = {}) => {
		const accessToken = jwt.sign(dataToSign, configs.ACCESS_SECRET, {expiresIn: "10m"});
		const refreshToken = jwt.sign(dataToSign, configs.REFRESH_SECRET, {expiresIn: "30d"});

		return {
			accessToken,
			refreshToken
		};
	},
	checkToken: (token = "", tokenType = tokenTypeEnum.accessToken) => {
		try {
			let secret = "";

			if (tokenType === tokenTypeEnum.accessToken) secret = configs.ACCESS_SECRET;
			else if (tokenType === tokenTypeEnum.refreshToken) secret = configs.REFRESH_SECRET;

			return jwt.verify(token, secret);
		} catch (e) {
			throw new ApiError("Token not valid", 401);
		}
	}
};