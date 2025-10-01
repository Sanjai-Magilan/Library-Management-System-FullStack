const validateUser = require("../Validations/validation.user");
const validate = (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
module.exports = validate;
