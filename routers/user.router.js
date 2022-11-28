const router = require("express").Router();
const controller = require("../controllers/user.controller");
const {
	isMongoIdValid,
	isBodyUpdateValid,
	isBodyCreateValid,
	isEmailUnique,
	isUserExistsDynamically
} = require("../middlewares/user.middleware");

router.get("/", controller.getAll);
router.post("/", isBodyCreateValid, isEmailUnique, controller.create);

router.get(
	"/:userId",
	isMongoIdValid,
	isUserExistsDynamically("userId", "params", "_id"),
	controller.getById
);
router.put(
	"/:userId",
	isMongoIdValid,
	isUserExistsDynamically("userId", "params", "_id"),
	isBodyUpdateValid,
	controller.update
);
router.delete(
	"/:userId",
	isMongoIdValid,
	isUserExistsDynamically("userId", "params", "_id"),
	controller.delete
);

module.exports = router;