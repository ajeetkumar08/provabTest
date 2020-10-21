const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile_image: {
    type: String,
    required: true,
  },
  address: [
    {
      House_Number: { type: String },
      Phone_Number: { type: String },
      Locality: { type: String },
      City: { type: String },
      Pin: { type: String },
      State: { type: String },
    },
  ],
});

module.exports = users = mongoose.model("users", userSchema);
