const {userService} = require("../services");

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const users = await userService.getByParams();
			res.json(users);
		} catch (e) {
			next(e);
		}
	},
	getById: async (req, res, next) => {
		try {
			res.json(req.user);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const user = await userService.create(req.body);

			res.status(201).json(user);
		} catch (e) {
			next(e);
		}
	},
	update: async (req, res, next) => {
		try {
			const {userId} = req.params;
			const newData = req.body;

			const user = await userService.updateById(userId, newData);

			res.status(201).json(user);
		} catch (e) {
			next(e);
		}
	},
	delete: async (req, res, next) => {
		try {
			const userId = req.params;
			await userService.deleteOne(userId);

			res.sendStatus(204).send("deleted");
		} catch (e) {
			next(e);
		}
	}
};