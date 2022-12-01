const {User} = require("../dataBases");

module.exports = {
	getByParams: async (filter = {}) => {
		return User.find(filter);
	},
	getOneByParams: async (filter = {}) => {
		return User.findOne(filter);
	},
	getByIdWidthCars: async (userId) => {
		return User.aggregate([
			{
				$match: {
					_id: userId
				}
			},
			{
				$lookup: {
					from: "cars",
					localField: "_id",
					foreignField: "_user_id",
					as: "cars"
				}
			}
		]);
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