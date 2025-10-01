const user = require("../Models/schema.user");
module.exports={
 CreateUser: async(req,res)=>{
    try{
        const UserInfo = new user(req.body);
        await UserInfo.save();
        res.status(201).send("Account created successfull");
    }catch(e){
        res.status(400).send();
    }
 },
 
}