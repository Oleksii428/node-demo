const {oauthService} = require("../services");
const OAuthSchema = require("../dataBases/Oauth");

module.exports = {
	login: async (req, res, next) => {
		try {
			const {user, body} = req;

			await oauthService.comparePasswords(user.password, body.password);

			const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

			await OAuthSchema.create({...tokenPair, _user_id: user.id});

			res.json({user, ...tokenPair});
		} catch (e) {
			next(e);
		}
	}
};