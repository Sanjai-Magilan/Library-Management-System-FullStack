const router = express.Router();
const Controller = require("../Controller/control.user");
const validate = require("../Validations/validation.user");

router.post("/signup", validate, Controller.CreateUser);
