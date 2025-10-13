const express = require("express");
const router = express.Router();
const Controller = require("../ContRoller/control.user");
const validate = require("../Middlewares/validate.user");
const Authentication = require("../Middlewares/UserAuth");
const Authorization = require("../Middlewares/Authorization");
const borrowAndReturn = ["admin", "user"];

router.post("/signup", validate, Controller.CreateUser);
router.post("/signin", Controller.LoginUser);
router.post(
  "/borrow",
  Authentication,
  Authorization(borrowAndReturn),
  Controller.BarrowBook
);
router.post(
  "/return",
  Authentication,
  Authorization(borrowAndReturn),
  Controller.ReturnBook
);

router.get(
  "/getUser",
  Authentication,
  Authorization(borrowAndReturn),
  Controller.GetUser
);
module.exports = router;
