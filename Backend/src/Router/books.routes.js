const express = require("express");
const router = express.Router();
const contRoll = require("../ContRoller/control.book");
const validate = require("../Middlewares/validate.book");

router.get("/", contRoll.GetAll);
router.get("/get/name/:name", contRoll.GetByName);
router.get("/get/id/:id", contRoll.GetById);
router.get("/sort/author/:author", contRoll.SortByAuthor);
router.get("/sort/date/:order", contRoll.SortByDate);
router.get("/get/set/:start/:end", contRoll.GetSet);
router.post("/add", validate, contRoll.AddBook);
router.delete("/delete/:id", contRoll.DeleteBook);
router.delete("/delete/name/:name", contRoll.DeleteByName);
router.put("/update/:id", contRoll.update);
module.exports = router;
