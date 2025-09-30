const Joi = require("joi");
const validateLibBook = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    author: Joi.string().alphanum().min(3).max(30).required(),
    availability: Joi.boolean(),
    time: Joi.date(),
  });

  return schema.validate(data);
};
module.exports = validateLibBook;