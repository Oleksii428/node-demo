const router = require("express").Router();
const {carController} = require("../controllers");
const {carMiddleware} = require("../middlewares");

router.get("/", carController.getAll);
router.post("/", carMiddleware.isBodyCreateValid, carController.create);

router.get("/:carId", carController.findOne);

module.exports = router;