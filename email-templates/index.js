const {CONTENT, FORGOT_PASS} = require("../configs/email.actions");
module.exports = {
	[CONTENT]: {
		subject: "Content title",
		templateName: "content.block"
	},
	[FORGOT_PASS]: {
		subject: "Password title",
		templateName: "forgot-pass.block"
	}
}