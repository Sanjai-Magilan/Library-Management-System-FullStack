const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  MailId: { type: String, required: true, unique: true },
  Username: { type: String, required: true, unique: true }, 
  Password: { type: String, required: true },
  UserRoll: { type: String, enum: ["admin", "user", "guest"] },
  BorrowedBooks: { type: String },
  borrowedDate: { type: Date },
  returnDate: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);
