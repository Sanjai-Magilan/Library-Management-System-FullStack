const mongoose = require("mongoose");
const { Schema } = mongoose;
const LibSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true }, // if we use uniqe , no need to use index
  author: { type: String, required: true },
  availability: { type: Boolean, default: true },
  time: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) }
});

module.exports = mongoose.model("LibBooks", LibSchema);
