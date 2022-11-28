const jwt = require("jsonwebtoken");

const configs = require("../configs/config");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/ApiError");

module.exports = {
	hashPassword: (password) => bcrypt.hash(password, 10),
	comparePasswords: async (hashPassword, password) => {
		const isPasswordsSame = await bcrypt.compare(password, hashPassword);

		if (!isPasswordsSame) {
			throw new ApiError("Wrong email or password", 400);
		}
	},
	generateAccessTokenPair: (dataToSign = {}) => {
		const accessToken = jwt.sign(dataToSign, configs.SECRET_ACCESS_WORD, {expiresIn: "15m"});
		const refreshToken = jwt.sign(dataToSign, configs.SECRET_REFRESH_WORD, {expiresIn: "30m"});

		return {
			accessToken,
			refreshToken
		};
	}
};