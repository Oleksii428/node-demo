const router = require("express").Router();
const {isBodyValid} = require("../middlewares/auth.middleware");
const userMiddleware = require("../middlewares/user.middleware");
const controller = require("../controllers/auth.controller");

router.post("/login", isBodyValid, userMiddleware.isUserExistsDynamically("email"), controller.login);

module.exports = router;