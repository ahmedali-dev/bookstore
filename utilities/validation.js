const { validationResult } = require("express-validator");
const { ApiError: apierr } = require("./ApiError");
module.exports = (req, res, next) => {
  const errorFormatter = ({ msg, path }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return { path, msg };
  };
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    next(apierr.validationError(errors.mapped()));
  }
  next()
};
