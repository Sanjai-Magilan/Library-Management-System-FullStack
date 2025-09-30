const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  console.log("Connecting to mongodb...");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successfull.");
  } catch (error) {
    console.error("MongoDB Connection Failed.");
    throw error;
  }
};

module.exports = connectDatabase;
