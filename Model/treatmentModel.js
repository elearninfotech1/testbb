let mongoose = require("mongoose");

let treatmentSchema = new mongoose.Schema({
  tname: {
    type: String,
    required: true,
  },
  tdesc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("treatment", treatmentSchema);
