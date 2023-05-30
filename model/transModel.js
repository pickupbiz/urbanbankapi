const mongoose = require("mongoose");

const transModel = mongoose.model("trans", {
  accno: { type: Number },
  acctype: { type: String },
  transtype: { type: String },
  amount: { type: Number },
  transdate: { type: Date },
});

module.exports = transModel;
