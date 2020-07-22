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

module.exports = router;
