const current = async (req, res) => {
  try {
    const { user } = req;
    const { email, subscription } = user;

    return res.status(200).json({
      data: {
        email,
        subscription,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  current,
};
