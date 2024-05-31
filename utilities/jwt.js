const jwt = require("jsonwebtoken");
const generateAccessToken = (payload, expires) => {
  const accessTokenSecret = process.env.access_token;
  return jwt.sign(payload, accessTokenSecret, { expiresIn: expires });
};

const generateRefreshToken = (payload, expires) => {
  const refreshTokenSecret = process.env.refresh_token;
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: expires });
};

module.exports = { generateAccessToken, generateRefreshToken };
