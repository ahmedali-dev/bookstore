const { body, validationResult } = require("express-validator");
const address = require("../db/address");
const { ApiError } = require("./../utilities/ApiError");
const getAddress = async (req, res, next) => {
  try {
    const result = await address.getAddress(req.user.id);
    if (result.length == 0) {
      next(ApiError.addressNotFound());
    }
    return res.status(200).json(result);
  } catch (err) {
    next(ApiError.addressNotFound());
  }
};

const updateAddressValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("mobile").isInt().notEmpty().withMessage("Mobile number is required"),
  body("government").notEmpty().withMessage("Government is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("address").notEmpty().withMessage("Address is required"),
];
const updateAddress = async (req, res, next) => {
  const { username, mobile, government, city, address: a } = req.body;
  try {
    const result = await address.updateOrInsertAddress({
      username,
      mobile,
      government,
      city,
      address: a,
      user_id: req.user.id,
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(ApiError.customError(500, "Something went wrong"));
  }
};

module.exports = { getAddress, updateAddressValidation, updateAddress };
