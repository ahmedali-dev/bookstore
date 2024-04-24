require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const body_parser = require("body-parser");
const connection = require("./db/connect");
const ApiError = require("./utilities/ApiError");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
// app.use((req, res, next) => {});

// require("./routes/test")(app);
require("./routes/register_route")(app);
require("./routes/signin_route")(app);

// test authentication routes
require("./routes/refresh_route")(app);
const RefreshToken = (req, res, next) => {
  if (!req.cookies.rt) return res.status(401).json({ msg: "Unauthorized" });
  next();
};
app.use("/images", RefreshToken, express.static("images"));
app.use(require("./utilities/Auth"));
require("./routes/test")(app);
app.use("/books", require("./routes/book_route"));
app.use("/categorys", require("./routes/categorys_route"));
app.use("/create", require("./routes/create_route"));
app.use("/reviews", require("./routes/reviews_route"));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE")
      return res.status(410).json({ error: "You can upload the 3 images only" });
    else if (err.code === "LIMIT_FILE_SIZE")
      return res
        .status(410)
        .json({ error: "Images is to large you can upload image less than 15mb" });
    else if (err.code === "LIMIT_FILE_COUNT")
      return res.status(410).json({ error: "You can upload 3 file only" });
    return res.status(410).json({ error: err.message });
  }
  next(err);
});

app.use(ApiError.errorHandler);
app.listen(process.env.port, () => {
  console.log("http://localhost:5000");
  connection.getConnection((err, connected) => {
    if (err) return console.log("🚀 ~ connection.getConnection ~ err:", err.message);
    console.log("🚀 ~ connection.getConnection ~ connected:");
  });
});
