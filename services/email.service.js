const path = require("path");

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
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

	if (!templateInfo?.subject || !templateInfo.templateName) {
		throw new ApiError("Wrong template", 500);
	}

	const options = {
		viewEngine: {
			defaultLayout: "main",
			layoutsDir: path.join(process.cwd(), "email-templates", "layouts"),
			partialsDir: path.join(process.cwd(), "email-templates", "partials"),
			extname: ".hbs",
		},
		extName: ".hbs",
		viewPath: path.join(process.cwd(), "email-templates", "views")
	};

	transporter.use("compile", hbs(options));

	locals.frontendURL = FRONTEND_URL;

	return transporter.sendMail({
		from: "User name",
		to: receiverEmail,
		subject: templateInfo.subject,
		template: templateInfo.templateName,
		context: locals
	});
};

module.exports = {
	sendEmail
};