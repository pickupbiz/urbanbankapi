const mongoose = require("mongoose");

const acctypesModel = mongoose.model("acctypes", {
  name: { type: String },
});

module.exports = acctypesModel;
