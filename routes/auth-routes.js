const express    = require("express");
const authRoutes = express.Router();
const passport = require("passport");

// User model
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  console.log("ping post signup")
  const username = req.body.username;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  if (username === "" || fullname === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Please, complete all the fields" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username: username,
      fullname: fullname,
      email: email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", {message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});


authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = authRoutes;
