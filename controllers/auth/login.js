const { User } = require("../../db/schemas");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(user._id, { token });

    return res.json({
      data: {
        token,
        user: {
          email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
};

module.exports = {
  login,
};
