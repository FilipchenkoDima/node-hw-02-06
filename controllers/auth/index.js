const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { current } = require("./current");
const { avatars } = require("./avatars");
const { verifyEmail } = require("./verifyEmail");
const { resendEmail } = require("./resendEmail");

module.exports = {
  register,
  login,
  logout,
  current,
  avatars,
  verifyEmail,
  resendEmail,
};
