const mongoose = require("mongoose");

const { Schema } = mongoose;

const BlogPost = new Schema({
  title: { type: String, require: true },

  content: { type: String, require: true },

  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", BlogPost);
