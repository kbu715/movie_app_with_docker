const mongoose = require("mongoose");

const MyScoreSchema = mongoose.Schema(
  {
    movieId: {
      type: Number,
    },
    score: {
      type: Number,
    },
    select: {
      type: [Number],
    }
  }
);

const MyScore = mongoose.model("MyScore", MyScoreSchema);

module.exports = { MyScore };
