const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeDataSchema = mongoose.Schema({
  key: {
    type: Number,
  },
  value: {
    type: String,
  },
});

const TimeData = mongoose.model("TimeData", timeDataSchema);

module.exports = { TimeData };
