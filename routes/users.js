const express = require("express");
const router = express.Router();
const Users = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (user && user.password == password) {
      req.session.userId = user._id;
      res.redirect("/admin");
    } else {
      res.redirect("/login");
      console.log("else girdi");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Sunucu hatası");
  }
});

module.exports = router;
