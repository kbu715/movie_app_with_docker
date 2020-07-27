  const express = require("express");
  const router = express.Router();
  const { MyScore } = require("../models/MyScore");

  router.post("/giveStarRating", (req, res) => { //별점 주기

    MyScore.findOne({ userFrom: req.body.userFrom, movieId: req.body.movieId }, (err, obj) => {

      if (obj === null) { //해당영화 없음(새로 별점)

        const myScore = new MyScore(req.body);
        myScore.save((err, doc) => {
          if (err) return res.status(400).send(err);
          return res.status(200).json({ success: true, doc });
        });

      } else {

        MyScore.findOneAndUpdate({ userFrom: req.body.userFrom, movieId: req.body.movieId }, { score: req.body.score }, (err, user) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).send({
            success: true,
          });
        })
        
      }
    })

  });


  module.exports = router;
