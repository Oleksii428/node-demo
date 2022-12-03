const {emailService, oauthService} = require("../services");
const {OAuth} = require("../dataBases");
const {CONTENT, FORGOT_PASS} = require("../configs/email.actions");

module.exports = {
	sendEmail: async (req, res, next) => {
		try {
			const user = {
				name: "Vasia",
				age: 22,
				email: "wifi5324518@gmail.com"
			}
			await emailService.sendEmail(user.email, CONTENT, {userName: user.name});

			res.json("Sanded");
		} catch (e) {
			next(e);
		}
	},
	sendEmail2: async (req, res, next) => {
		try {
			await emailService.sendEmail("wifi5324518@gmail.com", FORGOT_PASS);

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
	}
};