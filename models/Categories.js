const mongoose = require("mongoose");

const { Schema } = mongoose;

const Categories = new Schema({
  name: { type: String, require: true }
});

module.exports = mongoose.model("category", Categories);


