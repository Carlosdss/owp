const express    = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// Plan model
const Plan = require("../models/Plan");

router.get("/newPlan", (req, res, next) => {
  res.render("newPlan");
});


router.post("/newPlan", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const date = req.body.date;

  if (title === "" || description === "" || category === "" || date === "") {
    res.render("newPlan", { message: "Please, complete all the fields" });
    return;
  }

    const newPlan = Plan({
      title: title,
      description: description,
      category: category,
      date: date
    });

    newPlan.save((err) => {
      if (err) {
        res.render("newPlan", { message: "Something went wrong" });
      } else {
        //Aquí hay que meter la página de vista de detalle del plan creado
        res.redirect("/");
      }
  });
});

module.exports = router;
