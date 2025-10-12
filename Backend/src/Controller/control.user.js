const user = require("../Models/schema.user");
const Book = require("../Models/schema.book");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  CreateUser: async (req, res) => {
    try {
      const HashPass = await bcrypt.hash(req.body.Password, 10);
      const UserInfo = new user({ ...req.body, Password: HashPass });
      await UserInfo.save();
      const auth = jwt.sign(
        { MailId: req.body.MailId, UserRole: "user" },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: auth });
    } catch (e) {
      res.status(400).send(e);
    }
  },

  LoginUser: async (req, res) => {
    try {
      const UserData = req.body;
      const UserFound = await user.findOne({ MailId: UserData?.MailId });
      if (!UserFound) res.status(404).send("User not found");
      if (await bcrypt.compare(UserData.Password, UserFound.Password)) {
        const auth = jwt.sign(
          { MailId: UserFound.MailId, UserRole: UserFound.UserRole },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: auth });
      } else {
        res.status(401).send("Incorrect password");
      }
    } catch (e) {
      res.status(500).send(e);
    }
  },

  BarrowBook: async (req, res) => {
    try {
      const today = new Date();
      const BorrowedDate = today.toISOString().split("T")[0];
      const returnDate = new Date(today);
      returnDate.setDate(returnDate.getDate() + 14);
      const ReturnDate = returnDate.toISOString().split("T")[0];

      const { name } = req.body;
      const BookFound = await Book.findOne({ name });
      if (!BookFound) return res.status(404).send("Book Not Found");
      if (!BookFound.availability)
        return res.status(409).send("Book not available");
      await user.findOneAndUpdate(
        { MailId: req.User.MailId }, // we find data by {data key in db : our search data}
        {
          BorrowedBooks: name,
          borrowedDate: BorrowedDate,
          returnDate: ReturnDate,
        },
        { new: true, runValidators: true }
      );

      await Book.findOneAndUpdate(
        { name }, // Or just the key of the value what we need to find
        { availability: false },
        { new: true, runValidators: true }
      );
      res.status(200).send("Borrowed");
    } catch (e) {
      res.status(500).send(e);
    }
  },

  ReturnBook: async (req, res) => {
    const { name } = req.body;
    const BookFound = await Book.findOne({ name });
    if (!BookFound)
      return res.status(404).send("There is no Book to return in this name!");
    if (BookFound.availability)
      return res.status(409).send("Book the is not borrowed error");
    await user.findOneAndUpdate(
      { MailId: req.User.MailId },
      {
        BorrowedBooks: null,
        borrowedDate: null,
        returnDate: null,
      },
      { new: true, runValidators: true }
    );

    await Book.findOneAndUpdate(
      { name },
      { availability: true },
      { new: true, runValidators: true }
    );
    res.status(200).send("Returned");
  },

  GetUser: async (req, res) => {
    try {
      const MailId = req.User.MailId;
      const User = await user.findOne({ MailId });
      const cleanUser = {
        ...User._doc,
        borrowedDate: User.borrowedDate
          ? User.borrowedDate.toISOString().split("T")[0]
          : null,
        returnDate: User.returnDate
          ? User.returnDate.toISOString().split("T")[0]
          : null,
      };
      res.status(200).send(cleanUser);
    } catch (e) {
      res.status(500).send(e);
    }
  },
};
