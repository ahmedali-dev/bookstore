const { getUserByEmail } = require("../db/users");
const { ApiError: apperr } = require("./../utilities/ApiError");
const { generateAccessToken } = require("../utilities/jwt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { rt } = req.cookies;
  if (!rt) {
    return next(apperr.unauthorizedError());
  }

  try {
    const decoded = jwt.verify(rt, process.env.REFRESH_TOKEN);
    const { email } = decoded;
    const [result] = await getUserByEmail(email, "username,email,id");

    if (!result) {
      return next(apperr.userNotFound());
    }

    const accessToken = generateAccessToken(
      { avatar: result.avatar, username: result.username, email: result.email, id: result.id },
      "15s"
    );

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      next(apperr.unauthorizedError());
    } else if (err.name === "JsonWebTokenError") {
      next(apperr.unauthorizedError());
    } else {
      return next(apperr.customError(400, "Can't complete this process now"));
    }
  }
};
