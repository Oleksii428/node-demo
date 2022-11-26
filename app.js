require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/user.router");
const configs = require("./configs/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.json("Listening port 5000");
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500
	});
});

app.listen(5000, async () => {
	await mongoose.connect(configs.MONGO_URL);
	console.log("Server listen 5000");
});
