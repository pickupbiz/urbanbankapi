const mongoose = require("mongoose");

const loansModel= mongoose.model(
    "loans",
    {
        name : {type : String},
        isActive : {type: Boolean}
    }
)

module.exports = loansModel;