const router = require("express").Router();
const {authMiddleware, userMiddleware} = require("../middlewares");
const {authController} = require("../controllers");

router.post("/login", authMiddleware.isBodyValid, userMiddleware.isUserExistsDynamically("email"), authController.login);

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refresh);

module.exports = router;
