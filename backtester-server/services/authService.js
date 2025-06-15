const JWT = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createAccessToken = ({ userId, email, permissions }) => {
  return JWT.sign(
    {
      userId,
      email,
      permissions,
    },
    JWT_SECRET,
    {
      expiresIn: 30 * 60,
    }
  );
};

const validateAccessToken = (accessToken) => {
  return JWT.verify(accessToken, JWT_SECRET);
};

module.exports = {
  createAccessToken,
  validateAccessToken,
};
