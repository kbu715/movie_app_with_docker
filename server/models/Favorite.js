const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoriteSchema = mongoose.Schema(
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
    movieYear: {
      type: String,
    },
    movieRating: {
      type: Number,
    },
    isMovie: {
      type: Boolean,
    },
  },
  { timestamps: true } // 생성된 시간이나 그런것들을 자동으로 처리...
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };