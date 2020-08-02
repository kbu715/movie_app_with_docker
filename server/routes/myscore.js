  const express = require("express");
  const router = express.Router();
  const { MyScore } = require("../models/MyScore");

  router.post("/giveStarRating", (req, res) => { //별점 주기
    console.log("req.body:", req.body); //userFrom, movieId, genres, score, imageUrl, title
    let {userFrom, movieId, genres, score, imageUrl, title, _id} = req.body
    let query = {userFrom, movieId, genres, score, imageUrl, title, _id};

    console.log(query._id);

    if(query._id === undefined) {
      query._id = new mongoose.Types.ObjectId();
    }


    // MyScore.findOne({ userFrom: req.body.userFrom, movieId: req.body.movieId }, (err, obj) => {
    //   if (obj === null) { //해당영화 없음(새로 별점)
    //     const myScore = new MyScore(req.body);
    //     myScore.save((err, doc) => {
    //       if (err) return res.status(400).send(err);
    //       return res.status(200).json({ success: true, exist: false, doc });
    //     });
    //   } else {
    //     MyScore.findOneAndUpdate({ userFrom: req.body.userFrom, movieId: req.body.movieId }, { score: req.body.score }, (err, user) => {
    //       if (err) return res.json({ success: false, err });
    //       return res.status(200).send({
    //         success: true,
    //         exist: true,
    //       });
    //     })
    //   }
    // })


  });

  router.post("/myCount", (req,res)=>{
    MyScore.find({ userFrom: req.body.userFrom }, (err, obj)=>{
      return res.status(200).send({
        success: true,
        obj: obj,
      })
    })
  })

  router.post("/recent", (req,res)=>{
    MyScore.find({ userFrom: req.body.userFrom }, (err, obj)=>{
      return res.status(200).send({
        success: true,
        obj: obj,
      })
    })
  })

  module.exports = router;
