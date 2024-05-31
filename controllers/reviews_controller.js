const { body, param } = require("express-validator");
const Review = require("../db/reviews");
const { ApiError } = require("../utilities/ApiError");
const getReviewValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("Book ID is required"),
];
const getReviews = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviews = await Review.getReviews("*", "where book_id = ?", [id]);
    return res.status(200).json(reviews);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const addReviewValidation = [
  body("rating").isInt().isLength({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("review").isString().isLength({ min: 1 }).withMessage("Review is required"),
  body("book_id").isString().isLength({ min: 1 }).withMessage("Book ID is required"),
];

const addReview = async (req, res, next) => {
  const { rating, review, book_id } = req.body;
  const { id: user_id } = req.user;
  try {
    const data = { rating, review, book_id, user_id };

    const result = await Review.addReview(data);
    const reviews = await Review.getReviews("*", "where book_id = ?", [book_id]);
    return res.status(201).json({ result, reviews });
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};
module.exports = { getReviewValidation, getReviews, addReviewValidation, addReview };
