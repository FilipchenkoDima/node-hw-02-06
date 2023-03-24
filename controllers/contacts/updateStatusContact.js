const Contact = require("../../db/schemas");

const updateStatusContact = async (req, res) => {
  try {
    if (JSON.stringify(req.body) === "{}") {
      return res.status(404).json({ message: "Missing fields" });
    }
    const { contactId } = req.params;
    const { favorite } = req.body;

    const newFavorite = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: { favorite },
      },
      { returnDocument: "after" }
    );

    res.status(200).json(newFavorite);
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  updateStatusContact,
};
