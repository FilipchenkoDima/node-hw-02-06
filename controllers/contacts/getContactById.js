const { Contact } = require("../../db/schemas");

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const contact = await Contact.findById(contactId, owner);

    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContactById,
};
