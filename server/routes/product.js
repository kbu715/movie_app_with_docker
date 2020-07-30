const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", auth, (req, res) => {
  //받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body);

  product.save(err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", auth, (req, res) => {
  //product collection에 들어있는 모든 상품을 가져오기
  Product.find()
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, productInfo });
    });
});

router.get("/getCountOfProduct", (req, res) => {
  Product.find({}).exec((err, item) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, products: item });
  });
});

module.exports = router;
