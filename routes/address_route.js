const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address_controller");
const validation = require("./../utilities/validation");
router
  .get("/", addressController.getAddress)
  .post(
    "/",
    addressController.updateAddressValidation,
    validation,
    addressController.updateAddress
  );
module.exports = router;
