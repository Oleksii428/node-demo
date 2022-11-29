const router = require("express").Router();
const controller = require("../controllers/user.controller");
const {
	isMongoIdValid,
	isBodyUpdateValid,
	isBodyCreateValid,
	isEmailUnique,
	isUserExistsDynamically
} = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", controller.getAll);
router.post("/", isBodyCreateValid, isEmailUnique, controller.create);

router.get(
	"/:userId",
	isMongoIdValid,
	authMiddleware.checkAccessToken,
	isUserExistsDynamically("userId", "params", "_id"),
	controller.getById
);
router.put(
	"/:userId",
	isMongoIdValid,
	authMiddleware.checkAccessToken,
	isUserExistsDynamically("userId", "params", "_id"),
	isBodyUpdateValid,
	controller.update
);
router.delete(
	"/:userId",
	isMongoIdValid,
	authMiddleware.checkAccessToken,
	isUserExistsDynamically("userId", "params", "_id"),
	controller.delete
);

module.exports = router;