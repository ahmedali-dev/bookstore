const express = require("express");
const router = express.Router();
const gov = require("../db/government");
const { ApiError } = require("../utilities/ApiError");

router.get("/", async (req, res, next) => {
  try {
    const [result] = await gov();
    res.status(200).json(result);
  } catch (error) {
    next(ApiError.customError(404, "Not government found"));
  }
});

module.exports = router;
