const {Car} = require("../dataBases");

module.exports = {
	getByParams: async (filter = {}) => {
		return Car.find(filter);
	},
	getOneByid: async (carId) => {
		return Car.findById(carId).populate("_user_id");
	},
	create: async (newCar) => {
		return Car.create(newCar);
	}
};
