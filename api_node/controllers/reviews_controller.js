const { body, param } = require("express-validator");
const Review = require("../db/reviews");

const getReviewValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("Book ID is required"),
];
const getReviews = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviews = await Review.getReviews("*", "where book_id = ?", [id]);
    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    console.log("🚀 ~ addReview ~ data:", data);
    const result = await Review.addReview(data);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { getReviewValidation, getReviews, addReviewValidation, addReview };
