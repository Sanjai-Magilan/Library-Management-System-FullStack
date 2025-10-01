const user = require("../Models/schema.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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

  LoginUser: async (req, res) => {
    try {
      const UserData = req.body;
      const UserFound = await user.findOne({ MailId: UserData?.MailId });
      if (!UserFound)  res.status(404).send("User not found");
      console.log(UserFound.MailId);
      if (await bcrypt.compare(UserData.Password, UserFound.Password)) {
        const auth = jwt.sign(
          { MailId: UserFound.MailId, UserRole: UserFound.UserRole },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1h" }
        );
        res.status(200).json({ Authentication: auth });
      } else {
        res.status(401).send("Incorrect password");
      }
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
