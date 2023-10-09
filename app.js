const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const moment = require("moment");
const generateDate = require("./generateDate").generateDate;

mongoose.connect("mongodb://127.0.0.1/demo_", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/demo_" }),
  })
);

app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: { generateDate: generateDate },
  })
);

app.set("view engine", "handlebars");

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



const main = require("./routes/main");
const category = require("./routes/category");

const posts = require("./routes/posts");
app.use("/", main);
app.use("/posts", posts);
app.use("/", category);



const users = require("./routes/users");
app.use("/", users);

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor`);
});
