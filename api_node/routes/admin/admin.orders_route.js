const express = require("express");
const adminOrderCon = require("./../../controllers/admin/admin.Orders_controller");
const validation = require("./../../utilities/validation");
const router = express.Router();

router.get("/", adminOrderCon.getOrders);
router.get("/order/:id", [adminOrderCon.validation.id], validation, adminOrderCon.getOrderById);
router.get(
  "/search/:search",
  [adminOrderCon.validation.search],
  validation,
  adminOrderCon.searchInOrder
);
router.get('/f/filter', adminOrderCon.FilterOrderByDate)
router.patch(
  "/order/:id",
  [adminOrderCon.validation.id, adminOrderCon.validation.status, adminOrderCon.validation.shipping],
  validation,
  adminOrderCon.updateOrderById
);
module.exports = router;
