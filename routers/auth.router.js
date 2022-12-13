const router = require("express").Router();
const {authMiddleware, userMiddleware} = require("../middlewares");
const {authController} = require("../controllers");

router.post("/login", authMiddleware.isBodyValid, userMiddleware.isUserExistsDynamically("email"), authController.login);

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refresh);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post("/logoutAll", authMiddleware.checkAccessToken, authController.logoutAll);

router.post("/password/forgot", userMiddleware.isUserExistsDynamically("email"), authController.forgotPassword);
router.put("/password/forgot", authMiddleware.checkActionToken, authController.setPasswordAfterForgot);

router.post("/email/welcome", authController.sendEmailWelcome);
router.post("/email/forgot", authController.sendEmailForgot);

module.exports = router;
