const mongoose = require("mongoose");

const navsModel = mongoose.model("navs", {
  xs: { type: Number },
  path: { type: String },
  label: { type: String },
  isActive: { type: Boolean },
});

module.exports = navsModel;
