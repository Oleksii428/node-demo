const User = require("../dataBases/User");

module.exports = {
	getByParams: async (filter = {}) => {
		return User.find(filter);
	},
	getOneByParams: async (filter = {}) => {
		return User.findOne(filter);
	},
	create: async (newUser) => {
		return User.create(newUser);
	},
	updateById: async (userId, newData) => {
		return User.findByIdAndUpdate(userId, newData, {new: true});
	},
	deleteById: async (userId) => {
		return User.deleteOne({_id: userId});
	}
};