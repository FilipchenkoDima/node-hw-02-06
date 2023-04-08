const { User } = require("../../db/schemas");

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({
      verificationToken,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    return res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  verifyEmail,
};
