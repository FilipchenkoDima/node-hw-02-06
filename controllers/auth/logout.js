const { User } = require("../../db/schemas");

const logout = async (req, res) => {
  try {
    const { user } = req;
    const { _id } = user;

    await User.findByIdAndUpdate(_id, { token: "" });

    return res.status(204).json({ message: "Success" });
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  logout,
};
