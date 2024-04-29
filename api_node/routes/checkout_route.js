const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout_controller");
const validation = require("./../utilities/validation");
router.get("/", checkoutController.getOrders);
router.get("/seller", checkoutController.getOrderBySeller);
router.get(
  "/seller/:id",
  checkoutController.validation,
  validation,
  checkoutController.getOrderBySellerById
);
router.post("/", checkoutController.createOrder);

module.exports = router;
