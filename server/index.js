const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));
app.use("/api/favorite", require("./routes/favorite"));
app.use("/api/myscore", require("./routes/myscore"));
app.use("/api/image", require("./routes/image"));

app.use("/uploads", express.static("uploads")); //이거 했더니 안돼던 이미지 보여주기가 됐다. araboza...
app.use("/api/reservation", require("./routes/reservation"));

const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
