const mongoose = require("mongoose");

const usersModel = mongoose.model("users", {
  fname: { type: String },
  mname: { type: String },
  lname: { type: String },
  contact: { type: Number },
  accno: { type: Number },
  email: { type: String },
  username: { type: String },
  password: { type: String },
  isActive: { type: Boolean },
});

module.exports = usersModel;
