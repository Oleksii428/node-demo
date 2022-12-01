const {carService} = require("../services");

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const cars = await carService.getByParams();

			res.json(cars);
		} catch (e) {
			next(e);
		}
	},
	findOne: async (req, res, next) => {
		try {
			const {carId} = req.params;

			const car = await carService.getOneByid(carId);

			res.json(car);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const newCar = await carService.create(req.body);

			res.status(201).json(newCar);
		} catch (e) {
			next(e);
		}
	}
};