var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    createdForms: [],
  },
  { timestamps: true }
);

User = mongoose.model("User", UserSchema, "Users");
module.exports = User;
