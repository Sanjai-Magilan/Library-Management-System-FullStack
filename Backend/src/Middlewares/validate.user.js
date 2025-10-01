const validateUser = require("../Validations/validation.user");
const validate =(req,res,next)=>{
    const {error}= validateUser(req.body);
    if(error) return res.status(400).send("invalid formate");
    next();
}
module.exports = validate;