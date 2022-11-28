const {oauthService} = require("../services");

module.exports = {
	login: async (req, res, next) => {
		try {
			const {user, body} = req;

			await oauthService.comparePasswords(user.password, body.password);

			res.json("login completed");
		} catch (e) {
			next(e);
		}
	}
};