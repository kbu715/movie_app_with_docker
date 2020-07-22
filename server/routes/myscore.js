const express = require("express");
const router = express.Router();
// const { MyScore } = require("../models/MyScore");
const { User } = require("../models/User");

router.post("/giveStarRating", (req, res) => { //별점 주기

  console.log("res:", req.body);

  User.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/regiveStarRating", (req,res)=>{ //별점 수정
  User.findOneAndUpdate({userFrom: req.body.userFrom},{ select: req.body.select.filter(word=> word!==null) }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  })
})

module.exports = router;