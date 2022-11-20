const router = require("express").Router();
const controller = require("../controller/user.controller");
const {isBodyValidUpdate, isUserExists, isBodyValidCreate, isIdValid} = require("../middleware/user.middleware");

router.get("/", controller.getAll);
router.post("/", isBodyValidCreate, controller.post);
router.get("/:userId", isIdValid, isUserExists, controller.getById);
router.put("/:userId", isIdValid, isUserExists, isBodyValidUpdate, controller.update);
router.delete("/:userId", isIdValid, isUserExists, controller.delete);

module.exports = router;