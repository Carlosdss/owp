const express    = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

// Plan model
const Plan = require("../models/Plan");

router.get("/newPlan", (req, res, next) => {
  res.render("newPlan");
});


router.post("/newPlan", upload.single('photo'), function(req, res, next){
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const date = req.body.date;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  if (title === "" || description === "" || category === "" || date === "") {
    res.render("newPlan", { message: "Please, complete all the fields" });
    return;
  }

  if (!req.file) {
    res.render("newPlan", { message: "Please, upload a picture" });
    return;
  }

if (latitude === "" || longitude === "") {
    res.render("newPlan", { message: "Please, specify a valid address" });
    return;
  }

    const newPlan = Plan({
      title: title,
      description: description,
      category: category,
      date: date,
      picPath: `/uploads/${req.file.filename}`,
      picName: req.file.originalname,
      location: {
        type: "Point",
        coordinates:[req.body.latitude, req.body.longitude]
      }
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
