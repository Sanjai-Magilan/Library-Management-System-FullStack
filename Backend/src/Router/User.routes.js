const express = require("express");
const router = express.Router();
const Controller = require("../Controller/control.user");
const validate = require("../Middlewares/validate.user");

router.post("/signin", validate, Controller.CreateUser);

module.exports = router;
