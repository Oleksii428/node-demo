const {emailService, oauthService, userService, actionTokenService} = require("../services");
const {OAuth} = require("../dataBases");
const {tokenActionsEnum, emailActions} = require("../enums");
const {FRONTEND_URL} = require("../configs/config");

module.exports = {
	sendEmail: async (req, res, next) => {
		try {
			const user = {
				name: "Vasia",
				age: 22,
				email: "wifi5324518@gmail.com"
			};
			await emailService.sendEmail(user.email, emailActions.CONTENT, {userName: user.name});

			res.json("Sanded");
		} catch (e) {
			next(e);
		}
	},
	sendEmail2: async (req, res, next) => {
		try {
			await emailService.sendEmail("wifi5324518@gmail.com", emailActions.FORGOT_PASS);

			res.json("Sanded");
		} catch (e) {
			next(e);
		}
	},
	login: async (req, res, next) => {
		try {
			const {user, body} = req;

			await oauthService.comparePasswords(user.password, body.password);

			const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

			await OAuth.create({...tokenPair, _user_id: user.id});

			res.json({user, ...tokenPair});
		} catch (e) {
			next(e);
		}
	},
	refresh: async (req, res, next) => {
		try {
			const {refreshToken, _user_id} = req.tokenInfo;

			await OAuth.deleteOne({refreshToken});

			const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

			await OAuth.create({...tokenPair, _user_id});

			res.status(201).json(tokenPair);
		} catch (e) {
			next(e);
		}
	},
	logout: async (req, res, next) => {
		try {
			const {accessToken} = req.tokenInfo;

			await OAuth.deleteOne({accessToken});

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	logoutAll: async (req, res, next) => {
		try {
			const {_user_id} = req.tokenInfo;
			console.log(_user_id);

			await OAuth.deleteMany({_user_id});

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	forgotPassword: async (req, res, next) => {
		try {
			const user = req.user;

			const actionToken = oauthService.generateActionToken(tokenActionsEnum.FORGOT_PASSWORD, {email: user.email});

			await actionTokenService.create({
				token: actionToken,
				_user_id: user._id,
				tokenType: tokenActionsEnum.FORGOT_PASSWORD
			});

			const forgotUrl = `${FRONTEND_URL}/password/restore?token=${actionToken}`;

			await emailService.sendEmail("wifi5324518@gmail.com", emailActions.FORGOT_PASS, {forgotUrl});

			res.json("Check your email");
		} catch (e) {
			next(e);
		}
	},
	setPasswordAfterForgot: async (req, res, next) => {
		try {
			const hashPassword = await oauthService.hashPassword(req.body.password);

			await actionTokenService.deleteOne({token: req.get("Authorization")});

			await userService.updateById(req.user._id, {password: hashPassword});

			res.json("Password has been restored. Try to login again");
		} catch (e) {
			next(e);
		}
	},
};