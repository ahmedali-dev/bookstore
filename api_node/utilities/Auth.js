const jwt = require("jsonwebtoken");
const { ApiError: apperr } = require("./../utilities/ApiError");

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return next(apperr.unauthorizedError("Access token is required"));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(apperr.tokenExpiredError("Access token expired"));
    } else if (err.name === "JsonWebTokenError") {
      return next(apperr.unauthorizedError("Invalid access token"));
    } else {
      return next(apperr.customError(500, "Error verifying access token"));
    }
  }
};
