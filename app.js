const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

app.use(express.static("public"));

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");

mongoose.connect("mongodb://127.0.0.1/demo_", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const main=require('./routes/main')
const posts=require('./routes/posts')
    app.use("/",main)
    app.use("/posts",posts)
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});
