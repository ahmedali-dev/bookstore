const { param, body } = require("express-validator");
const cart = require("../db/cart");

const getCartValidation = [
  body("book_id").isString().isLength({ min: 1 }).withMessage("User ID is required"),
  body("count")
    .isInt()
    .withMessage("Count must be an integer")
    .isLength({ min: 1, max: 7 })
    .withMessage("Count must be greater than 0 and less than 7"),
];

const addToCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { book_id, count } = req.body;
  try {
    const cartFromDb = await cart.addToCart({ user_id, book_id, count });
    res.status(200).json(cartFromDb);
  } catch (error) {
    console.log("🚀 ~ addToCart ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const { id: user_id } = req.user;
  try {
    const cartFromDb = await cart.getCart(user_id);
    res.status(200).json(cartFromDb);
  } catch (error) {
    console.log("🚀 ~ getCart ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCartById = async (req, res) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  try {
    const cartFromDb = await cart.getCartById(user_id, id);
    res.status(200).json(cartFromDb);
  } catch (error) {
    console.log("🚀 ~ getCartById ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  const { count } = req.body;
  try {
    const cartFromDb = await cart.updateCart(user_id, id, count);
    res.status(200).json(cartFromDb);
  } catch (error) {
    console.log("🚀 ~ updateCart ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCartValidation = [
  param("id").isString().isLength({ min: 1 }).withMessage("User ID is required"),
];
const deleteCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  try {
    const cartFromDb = await cart.deleteCart(user_id, id);
    res.status(200).json(cartFromDb);
  } catch (error) {
    console.log("🚀 ~ deleteCart ~ error:", error);
    res.status(500).json({ error: error.message });
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
