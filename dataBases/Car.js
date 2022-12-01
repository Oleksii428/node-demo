const {model, Schema} = require("mongoose");

const CarSchema = new Schema({
   model: {type: String, required: true, trim: true},
   year: {type: Number, required: true},
   price: {type: Number, required: true},
   _user_id: {type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = model("Car", CarSchema);
