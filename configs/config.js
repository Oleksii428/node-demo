module.exports = {
	MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/default",
	SECRET_ACCESS_WORD: process.env.SECRET_ACCESS_WORD,
	SECRET_REFRESH_WORD: process.env.SECRET_REFRESH_WORD
};