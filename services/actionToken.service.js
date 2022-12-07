const {ActionToken} = require("../dataBases");

module.exports = {
	deleteOne: async (filter = {}) => {
		return ActionToken.deleteOne(filter);
	},
	create: async (newToken = {}) => {
		return ActionToken.create(newToken);
	},
	findOne: async (filter = {}) => {
		return ActionToken.findOne(filter);
	}
}
