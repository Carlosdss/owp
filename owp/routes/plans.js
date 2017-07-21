const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const multer = require('multer');
const upload = multer({
  dest: './public/uploads/'
});
const TYPES = require('../models/plan-types');
const Plan = require("../models/Plan");
const Comment = require("../models/Comment");

router.get("/list", (req, res, next) => {
  Plan.find({})
    .exec((err, plans) => {
      res.render('planList', {
        plans
      });
    });
});

router.get("/newPlan", (req, res, next) => {
  res.render("newPlan", {
    types: TYPES
  });
});

router.post("/newPlan", upload.single('photo'), function(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const date = req.body.date;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  if (title === "" || description === "" || category === "" || date === "") {
    res.render("newPlan", {
      message: "Please, complete all the fields"
    });
    return;
  }

  if (!req.file) {
    res.render("newPlan", {
      message: "Please, upload a picture"
    });
    return;
  }

  if (latitude === "" || longitude === "") {
    res.render("newPlan", {
      message: "Please, specify a valid address"
    });
    return;
  }

  const newPlan = Plan({
    title: title,
    description: description,
    category: category,
    date: date,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.file.originalname,
    creator: req.user._id,
    location: {
      type: "Point",
      coordinates: [req.body.latitude, req.body.longitude]
    }
  });

  newPlan.save((err) => {
    if (err) {
      res.render("newPlan", {
        message: "Something went wrong",
        types: TYPES
      });
    } else {
      //Aquí hay que meter la página de vista de detalle del plan creado
      console.log(req.user);
      console.log("ping");
      res.redirect("/plans/list");
    }
  });
});

router.get('/:id', /*checkOwnership,*/ (req, res, next) => {
  Plan.findById(req.params.id).exec().then( plan => {
      return Comment.find({plan_id: req.params.id}).then(comments => {
        console.log(comments);
        return res.render('planDetails', { plan, comments });
      });
  }).catch(e =>console.log(e));

});

router.post('/:id', (req, res, next) => {
  const text = req.body.text;
  const planID = req.params.id;
  const creator = req.user._id;

  if (text == ""){return;}

  const newComment = Comment({
    text: text,
    plan_id: planID,
    creator: creator
  });

  newComment.save((err) => {
    if (err) {
        console.log("error al guardar comment");
    } else {
      //Aquí hay que meter la página de vista de detalle del plan creado
      res.redirect(`/plans/${req.params.id}`);
    }
  });
});


module.exports = router;
