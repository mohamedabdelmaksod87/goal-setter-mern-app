const express = require("express");
const router = express.Router();
const Validation = require("../validator/goalsValidator");
const UserController = require("../controllers/userController");
const Protect = require("../authorization/protect-routes");

router
  .route("/")
  .post(Validation.registerValidation, UserController.registerUser);

router
  .route("/login")
  .post(Validation.loginValidation, UserController.loginUser);

// router.route("/me").get(Protect.chkToken, UserController.userData);

module.exports = router;
