const mongoose = require("mongoose");
const Post = require("./models/Post"); // Post modelini doğru şekilde import et



Post.findByIdAndDelete("651a9b8274a70d718d8c506f")
  .then((post) => {
    console.log(post);
  })
  .catch((error) => {
    console.log(error);
  });

Post.find({
  title: "Post başlığı 2",
})
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });

