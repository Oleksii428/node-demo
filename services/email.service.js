const path = require("path");

const nodemailer = require("nodemailer");
const EmailTemplates = require("email-templates");
const {NO_REPLAY_EMAIL, NO_REPLAY_EMAIL_PASSWORD, FRONTEND_URL} = require("../configs/config");
const emailTemplates = require("../email-templates");
const ApiError = require("../errors/ApiError");


const sendEmail = async (receiverEmail, emailAction, locals = {}) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: NO_REPLAY_EMAIL,
			pass: NO_REPLAY_EMAIL_PASSWORD
		}
	});

	const templateInfo = emailTemplates[emailAction];

	if (!templateInfo) {
		throw new ApiError("Wrong template", 500);
	}

	const templateRender = new EmailTemplates({
		views: {
			root: path.join(process.cwd(), "email-templates")
		}
	});

	locals.frontendURL = FRONTEND_URL;

	const content = await templateRender.render(templateInfo.templateName, locals);

	return transporter.sendMail({
		from: "User name",
		to: receiverEmail,
		subject: templateInfo.subject,
		html: content
	});
};

module.exports = {
	sendEmail
};