const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controller");
const validation = require("./../utilities/validation");
router.get("/", cartController.getCart);
router.get("/by/:id", cartController.deleteCartValidation, validation, cartController.getCartById);
router.post("/", cartController.getCartValidation, validation, cartController.addToCart);
router.patch(
  "/update",
  // [cartController.getCartValidation[0]],
  cartController.getCartValidation,
  validation,
  cartController.updateCart
);
router.delete(
  "/delete/:id",
  cartController.deleteCartValidation,
  validation,
  cartController.deleteCart
);

module.exports = router;
