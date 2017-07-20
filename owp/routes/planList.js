const express    = require("express");
const router = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Plan = require("../models/Plan");

router.get("/list", (req, res, next) => {
  Campaign
    .find({})
    .populate('creator')
    .exec( (err, plans) => {
        res.render('index', {plans});
    });
});

module.exports = router;
