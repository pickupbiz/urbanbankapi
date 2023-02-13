const mongoose = require("mongoose");

const cardsModel = mongoose.model("cards", {
  name: { type: String },
});

module.exports = cardsModel;
