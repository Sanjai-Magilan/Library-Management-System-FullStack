const Joi = require("joi");
const validateUser = (data) => {
  const schema = Joi.object({
    MailId: Joi.string().email({ minDomainSegments: 2 }).required(),
    Username: Joi.string().alphanum().min(3).max(30).required(),
    Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    UserRoll: Joi.string().valid("admin", "user", "guest"),
    BorrowedBooks: Joi.string(),
    borrowedDate: Joi.date(),
    returnDate: Joi.date(),
  });

  return schema.validate(data);
};
module.exports = validateUser;
