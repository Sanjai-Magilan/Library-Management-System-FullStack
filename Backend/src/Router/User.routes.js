const express = require("express");
const router = express.Router();
const Controller = require("../Controller/control.user");
const validate = require("../Middlewares/validate.user");

router.post("/signup", validate, Controller.CreateUser);
router.post("/signin",Controller.LoginUser)

module.exports = router;
