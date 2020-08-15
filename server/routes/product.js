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

router.post("/image", auth, (req, res) => {
  //가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
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

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  if (term) {
    Product.find()
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  } else {
    //product collection에 들어 있는 모든 상품 정보를 가져오기
    //populate는 DB에 저장된 오브젝트ID의 모든 정보를 가져오는것
    Product.find()
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  }
});

router.get("/getCountOfProduct", (req, res) => {
  Product.find({}).exec((err, item) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, products: item });
  });
});

router.get("/management", (req, res) => {
  // console.log("req:", req);
  Product.find({}).exec((err, item) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, products: item });
    });
});

router.post("/removeFromProduct", (req, res) => {
  Product.findOneAndDelete({
    _id: req.body._id,
  }).exec(err => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.get("/products_by_id", (req, res) => {
  //axios 주소에 걸린 조건은 타입이라 query로 받는다.
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  //productId를 이용해서 DB에서 ProductId와 같은 상품의 정보를 가져온다.
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
});

module.exports = router;
