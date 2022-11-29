module.exports = {
	MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/default",
	ACCESS_SECRET: process.env.ACCESS_SECRET || "secretAccessWord",
	REFRESH_SECRET: process.env.REFRESH_SECRET || "secretRefreshWord"
};