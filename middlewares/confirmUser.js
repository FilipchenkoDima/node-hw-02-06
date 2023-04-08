const { User } = require("../db/schemas");

const confirmUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user.verify) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(404).json({ message: "User not found :(" });
  }
};

module.exports = {
  confirmUser,
};
