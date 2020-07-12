const express = require("express");
const passport = require("passport");
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const router = express.Router();

// @desc       Auth with Google
// @route      GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// @desc       Google Auth callback
// @route      GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to dashboard
    Doctor.findOne({'userID': `${req.user._id}`}, (err, doctor) => {
      if(err){
        console.log(`No Doctor`);
        console.log(`${err}`);
        Patient.findOne({'userID': `${req.user._id}`}, (err11, patient) => {
          if(err1) {
            console.log(`No User`);
            console.log(`${err1}`);
            res.redirect('/choice');
          }
          else {
            res.redirect(`/patient/${patient._id}/dashboard`);
          }
        });
      } else {
        res.redirect(`/doctor/${doctor._id}/dashboard`);
      }
    })
  }
);

// @desc       Logout
// @route      GET /auth/logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
