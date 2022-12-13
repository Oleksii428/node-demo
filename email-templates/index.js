const {CONTENT, FORGOT_PASS} = require("../enums/email.actions.enum");
module.exports = {
	[CONTENT]: {
		subject: "Content title",
		templateName: "content"
	},
	[FORGOT_PASS]: {
		subject: "Password title",
		templateName: "forgot-pass"
	}
}