const { confirmUser } = require("./confirmUser");
const { upload } = require("./uploadAvatar");
const { userRegisterValidation } = require("./userMiddleware");
const { verifyMiddleware } = require("./verifyMiddleware");
const {
  postContactValidation,
  putContactValidation,
  patchFavoriteValidation,
} = require("./validationMiddleware");


module.exports = {
  postContactValidation,
  putContactValidation,
  patchFavoriteValidation,
  userRegisterValidation,
  upload,
  confirmUser,
  verifyMiddleware,
};
