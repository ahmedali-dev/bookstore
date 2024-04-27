const { param, body } = require("express-validator");
const cart = require("../db/cart");
const { ApiError } = require("../utilities/ApiError");

const getCartValidation = [
  body("book_id").isString().isLength({ min: 1 }).withMessage("User ID is required"),
  body("count")
    .isInt()
    .withMessage("Count must be an integer")
    .isLength({ min: 1, max: 7 })
    .withMessage("Count must be greater than 0 and less than 7"),
];

const addToCart = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { book_id, count } = req.body;
  try {
    const cartFromDb = await cart.addToCart({ user_id, book_id, count });
    res.status(200).json(cartFromDb);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const getCart = async (req, res, next) => {
  const { id: user_id } = req.user;
  try {
    const cartFromDb = await cart.getCart(user_id);
    res.status(200).json(cartFromDb);
  } catch (error) {
    console.log("🚀 ~ getCart ~ error:", error);
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const getCartById = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  try {
    const cartFromDb = await cart.getCartById(user_id, id);
    res.status(200).json(cartFromDb);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const updateCart = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { book_id, count = 1 } = req.body;
  console.log("🚀 ~ updateCart ~ count:", req.body);
  try {
    const cartFromDb = await cart.updateCart({ user_id, book_id, count });
    if (count == 0) {
      return res.status(200).json({ deleted: true, id: book_id });
    }
    const [updatedCart] = await cart.getCart(user_id, book_id);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.log("🚀 ~ updateCart ~ error:", error);
    next(ApiError.customError(500, "Something went wrong"));
  }
};

const deleteCartValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("User ID is required"),
];
const deleteCart = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  try {
    const cartFromDb = await cart.deleteCart(user_id, id);
    res.status(200).json(id);
  } catch (error) {
    next(ApiError.customError(500, "Something went wrong"));
  }
};

module.exports = {
  getCartValidation,
  addToCart,
  getCart,
  updateCart,
  deleteCartValidation,
  deleteCart,
  getCartById,
};
