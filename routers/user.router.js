const router = require("express").Router();
const {userController} = require("../controllers");
const {authMiddleware, userMiddleware} = require("../middlewares")

router.get("/", userController.getAll);
router.post("/", userMiddleware.isBodyCreateValid, userMiddleware.isEmailUnique, userController.create);

router.get(
	"/:userId",
	userMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	userMiddleware.isUserExistsDynamically("userId", "params", "_id"),
	userController.getById
);
router.put(
	"/:userId",
	userMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	userMiddleware.isUserExistsDynamically("userId", "params", "_id"),
	userMiddleware.isBodyUpdateValid,
	userController.update
);
router.delete(
	"/:userId",
	userMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	userMiddleware.isUserExistsDynamically("userId", "params", "_id"),
	userController.delete
);
router.get(
	"/wcars/:userId",
	userMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	userMiddleware.isUserExistsDynamically("userId", "params", "_id"),
	userController.getByIdWidthCars
);

module.exports = router;
