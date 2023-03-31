const { Contact } = require("../../db/schemas");

const refurbishContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const newContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: req.body,
      },
      { returnDocument: "after" },
      owner
    );

    res.status(200).json(newContact);
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  refurbishContact,
};
