const express = require("express");
const router = express.Router();
const controll = require("../ContRoller/control.book");
const validate = require("../Middlewares/validate.book");
const Authentication = require("../Middlewares/UserAuth");
const Authorization = require("../Middlewares/Authorization");
const LowAccess = ["guest", "admin", "user"];
const HighAccess = ["admin"];

router.get("/", Authentication, Authorization(LowAccess), controll.GetAll);
router.get(
  "/get/name/:name",
  Authentication,
  Authorization(LowAccess),
  controll.GetByName
);
router.get(
  "/get/id/:id",
  Authentication,
  Authorization(LowAccess),
  controll.GetById
);
router.get(
  "/sort/author/:author",
  Authentication,
  Authorization(LowAccess),
  controll.SortByAuthor
);
router.get(
  "/sort/date/:order",
  Authentication,
  Authorization(LowAccess),
  controll.SortByDate
);
router.get(
  "/get/set/:start/:end",
  Authentication,
  Authorization(LowAccess),
  controll.GetSet
);
router.post(
  "/add",
  Authentication,
  Authorization(HighAccess),
  validate,
  controll.AddBook
);
router.delete(
  "/delete/:id",
  Authentication,
  Authorization(HighAccess),
  controll.DeleteBook
);
router.delete(
  "/delete/name/:name",
  Authentication,
  Authorization(HighAccess),
  controll.DeleteByName
);
router.put(
  "/update/:id",
  Authentication,
  Authorization(HighAccess),
  controll.update
);
module.exports = router;
