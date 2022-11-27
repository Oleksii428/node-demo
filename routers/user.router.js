const router = require("express").Router();
const controller = require("../controllers/user.controller");
const {isMongoIdValid, isBodyUpdateValid, isUserExists, isBodyCreateValid, isEmailUnique} = require("../middlewares/user.middleware");

router.get("/", controller.getAll);
router.post("/", isBodyCreateValid, isEmailUnique, controller.create);
router.get("/:userId", isMongoIdValid, isUserExists, controller.getById);
router.put("/:userId", isMongoIdValid, isUserExists, isBodyUpdateValid, controller.update);
router.delete("/:userId", isMongoIdValid, isUserExists, controller.delete);

module.exports = router;