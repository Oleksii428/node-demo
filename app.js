require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const {authRouter, carRouter, userRouter} = require("./routers");
const {MONGO_URL, PORT} = require("./configs/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
	res.json(`Listening port ${PORT}`);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500
	});
});

app.listen(PORT, async () => {
	await mongoose.connect(MONGO_URL);
	console.log(`Server listening ${PORT}`);
});
