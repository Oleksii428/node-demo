const {carValidator} = require("../validators");
const ApiError = require("../errors/ApiError");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const carInfo = req.body;

			const validate = carValidator.createCarValidator.validate(carInfo);

			if (validate.error) {
				throw new ApiError(validate.error.message, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};