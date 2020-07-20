const express = require("express");
const router = express.Router();
const { MyScore } = require("../models/MyScore");

router.post("/giveStarRating", (req, res) => { //별점주기
  console.log(req.body);
  const myScore = new MyScore(req.body);

  myScore.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
