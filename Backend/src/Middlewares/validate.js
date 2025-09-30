const validateLibBook = require("../validations/validation");
function validate (req,res,next){
    const {error}= validateLibBook(req.body);
    if(error) return res.status(400).send("invalid formate");
    next();
}
module.exports = validate;