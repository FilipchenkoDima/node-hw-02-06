const { User } = require("../../db/schemas");
const { emailSender } = require("../../helpers/emailSender");

const resendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Missing email" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await emailSender({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http:localhost:3000/api/users/verify/${user.verificationToken}"></a>`,
    });

    res.status(200).json({ message: "Verification email send" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }
};

module.exports = {
  resendEmail,
};
