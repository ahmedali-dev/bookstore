const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviews_controller");
const validation = require("./../utilities/validation");
router.get("/:id", reviewController.getReviewValidation, validation, reviewController.getReviews);
router.post("/", reviewController.addReviewValidation, validation, reviewController.addReview);
module.exports = router;
