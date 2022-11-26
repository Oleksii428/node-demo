const router = require("express").Router();
const controller = require("../controllers/user.controller");
const {isBodyUpdateValid, isUserExists, isBodyCreateValid, isIdValid, isEmailUnique} = require("../middlewares/user.middleware");

router.get("/", controller.getAll);
router.post("/", isBodyCreateValid, isEmailUnique, controller.create);
router.get("/:userId", isIdValid, isUserExists, controller.getById);
router.put("/:userId", isIdValid, isUserExists, isBodyUpdateValid, controller.update);
router.delete("/:userId", isIdValid, isUserExists, controller.delete);

module.exports = router;