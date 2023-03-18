const Contact = require("../db/schemaContact");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});

  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);

  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    await Contact.findByIdAndRemove(contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};

const refurbishContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const newContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: req.body,
      },
      { returnDocument: "after" }
    );

    res.status(200).json(newContact);
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};

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
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  refurbishContact,
  updateStatusContact,
};
