const user = require("../Models/schema.user");
const bcrypt = require("bcrypt");
module.exports = {
  CreateUser: async (req, res) => {
    try {
      const HashPass = await bcrypt.hash(req.body.Password, 10);
      const UserInfo = new user({ ...req.body, Password: HashPass });
      await UserInfo.save();
    //   res.status(201).send("Account created successfull");
    res.status(201).json(UserInfo);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
