const express = require("express");
const router = express.Router();
var request = require("request");

var opt = {
  async: true,
  crossDomain: true,
  method: "POST",
  url: "https://kapi.kakao.com/v1/payment/ready",
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    Authorization: "KakaoAK df8bab28cc8cb4f3ab1276487f028caf",
    "cache-control": "no-cache",
  },
  form: {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "영화 예매",
    quantity: "1",
    total_amount: "20000",
    // vat_amount: "200",
    tax_free_amount: "0",
    approval_url: "http://localhost:3000/payment/approve",
    fail_url: "http://localhost:3000/payment/fail",
    cancel_url: "http://localhost:3000/payment/cancel",
  },
};

var optt = {
  async: true,
  crossDomain: true,
  method: "POST",
  url: "https://kapi.kakao.com/v1/payment/approve",
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    Authorization: "KakaoAK df8bab28cc8cb4f3ab1276487f028caf",
    "cache-control": "no-cache",
  },
  form: {
    cid: "TC0ONETIME",
    tid: "T1234567890123456789",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    pg_token: "xxxxxxxxxxxxxx"
  },
};
/* GET users listing. */
router.post("/ready", (req, res, next) => {
  console.log("req.body", req.body);
  console.log("카카오페이");
  opt.form.total_amount = String(req.body.price);
  console.log("opt", opt);
  request.post(opt, (error, response, body) => {
    console.log(error);
    console.log(request);
    return res.json(JSON.parse(body));
  });
});

// router.post("/approve", (req, res, next) => {
//   request.post(optt, (error, response, body) => {
//     console.log(error);
//     console.log(request);
//     return res.json(JSON.parse(body));
//   });
// });

module.exports = router;
