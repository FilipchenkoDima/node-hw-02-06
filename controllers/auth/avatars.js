const { User } = require("../../db/schemas");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatars = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { filename } = req.file;

    const tmpPath = path.resolve(__dirname, "../../tmp", filename);
    const publicPath = path.resolve(
      __dirname,
      "../../public/avatars",
      filename
    );
    await fs.rename(tmpPath, publicPath);

    Jimp.read(publicPath, (err, image) => {
      if (err) return next(err);

      image.resize(250, 250).write(publicPath);
    });

    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL: `/avatars/${filename}` },
      { new: true }
    );

    return res.status(200).json({ avatarURL: user.avatarURL });
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  avatars,
};
