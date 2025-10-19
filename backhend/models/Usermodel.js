const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    organization: { type: String },
    partners: { type: Number }
});

module.exports = mongoose.model("User", userSchema);
