const { User } = require("../../db/schemas");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const { emailSender } = require("../../helpers/emailSender");

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarUrl = gravatar.url(email);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const verificationToken = uuid();

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL: avatarUrl,
      verificationToken,
    });

    await emailSender({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="http:localhost:3000/api/users/verify/${verificationToken}"></a>`,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: user._id,
          avatarURL: avatarUrl,
        },
      },
    });
  } catch (err) {
    return res.status(409).json({ message: "Email in use" });
  }
};

module.exports = {
  register,
};
