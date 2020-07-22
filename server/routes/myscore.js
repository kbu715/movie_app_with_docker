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

// router.post("/getStarRating", (req, res) => { //별점매긴거 가져오기
//   MyScore.find({ userFrom: req.body.userFrom }).exec((err, myScore) => {
//     if (err) return res.status(400).send(err);
//     return res.status(200).json({ success: true, myScore });
//   });
// });

module.exports = router;
