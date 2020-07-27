const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    theaters: {
      type: Array,
      default: [],
    },
    selectDay: {
      type: Array,
      default: [],
    },
    time: {
      type: Array,
      default: [],
    },
    continent: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    seat: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // 생성된 시간이나 그런것들을 자동으로 처리...
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = { Reservation };
