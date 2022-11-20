const {fileServices} = require("../services");

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const users = await fileServices.reader();
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
	post: async (req, res, next) => {
		try {
			const userInfo = req.body;
			const users = await fileServices.reader();
			const newUser = {
				id: users[users.length - 1].id + 1,
				name: userInfo.name,
				age: userInfo.age
			};
			users.push(newUser);

			await fileServices.writer(users);

			res.status(201).json(newUser);
		} catch (e) {
			next(e);
		}
	},
	update: async (req, res, next) => {
		try {
			const {user, users, body} = req;

			const index = users.findIndex((u) => u.id === user.id);
			users[index] = {...users[index], ...body};

			await fileServices.writer(users);

			res.status(201).json(users[index]);
		} catch (e) {
			next(e);
		}

	},
	delete: async (req, res, next) => {
		try {
			const {users, user} = req;

			const index = users.findIndex((u) => u.id === user.id);

			users.splice(index, 1);

			await fileServices.writer(users);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	}
};