const { isTokenValid, attachCookiesToResponse } = require("../utils");
const Token = require("../models/token.model");

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(refreshToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken.isValid) {
      return next({
        status: 403,
        message: "Authentication Failed",
      });
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    (req.user = payload.user), next();
  } catch (error) {
    return next({
      status: 403,
      message: "Authentication Invalid",
    });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next({
        status: 403,
        message: "Unauthorized to access this route",
      });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
