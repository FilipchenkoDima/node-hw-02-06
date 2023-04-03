const { User } = require("../../db/schemas");
const gravatar = require("gravatar");
// const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarUrl = gravatar.url(email);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      avatarURL: avatarUrl,
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
