const express = require("express");
const router = express.Router();
const { Reservation } = require("../models/Reservation");

router.post("/", (req, res) => {
  const reservation = new Reservation(req.body);

  reservation.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/findSeat", (req, res) => {
  Reservation.find({ title: req.body.title }).exec((err, seats) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, seats });
  });
});

router.post("/getList", (req, res) => {
  Reservation.find().exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
