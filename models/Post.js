const mongoose = require("mongoose");

const { Schema } = mongoose;

const BlogPost = new Schema({
  title: { type: String, require: true },

  content: { type: String, require: true },

  date: { type: Date, default: Date.now },

  post_image: {
    type: String,
    require: true,
  },
  author: { type: String, require: true },

  category:{type:String,require:true}

});

module.exports = mongoose.model("post", BlogPost);
