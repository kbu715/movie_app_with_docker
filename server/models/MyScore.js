const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MyScoreSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: Number,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    myScore: {
      type: Number,
    },
  }
);

const MyScore = mongoose.model("MyScore", MyScoreSchema);

module.exports = { MyScore };
