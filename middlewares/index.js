const { upload } = require("./uploadAvatar");
const { userRegisterValidation } = require("./userMiddleware");
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
};
