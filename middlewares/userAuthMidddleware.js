const jwt = require("jsonwebtoken");
const { User } = require("../db/schemas");

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    user.token = token;
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = {
  authMiddleware,
};
