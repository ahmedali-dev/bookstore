const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book_controller");
const validation = require("./../utilities/validation");
const upload = require("../utilities/uploading");
// router.post(
//   "/new",
//   upload.single("cover"),
//   (res, req, next) => {

//   }
// );

module.exports = router;
