const Contact = require("../../db/schemas");

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    await Contact.findByIdAndRemove(contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  deleteContact,
};
