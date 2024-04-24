const { body } = require("express-validator");
const { getUserByEmail } = require("../db/users");
const bcrypt = require("bcrypt");
const { ApiError: apperr } = require("./../utilities/ApiError");
const { generateAccessToken, generateRefreshToken } = require("../utilities/jwt");

const validation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/)
    .withMessage("Password must contain at least one uppercase letter and one special character"),
];

const signinUser = async (req, res, next) => {
  const { email, password } = req.body;

  const [result] = await getUserByEmail(email, "username,email, password,id");
  console.log(result);

  if (!result) {
    return next(apperr.userNotFound());
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (!isPasswordValid) {
      return next(apperr.userNotFound());
    }

    const accessToken = generateAccessToken(
      {
        username: result.username,
        email: result.email,
        id: result.id,
      },
      "15d"
    );
    const refreshToken = generateRefreshToken(
      {
        username: result.username,
        email: result.email,
        id: result.id,
      },
      "100d"
    );

    // save refresh token in cookie
    res.cookie("rt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 100 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    return apperr.customError(400, "Can't complete this proccess now");
  }
};

module.exports = { validation, signinUser };
