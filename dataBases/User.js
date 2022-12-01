const {Schema, model} = require("mongoose");

const userSchema = new Schema({
	name: {type: String, required: true, default: ""},
	email: {type: String, required: true, trim: true, unique: true, lowercase: true},
	password: {type: String},
	age: {type: Number, default: 18},
	car: {type: Schema.Types.ObjectId, ref: "User"}
}, {
	timestamps: true
});

module.exports = model("User", userSchema);
