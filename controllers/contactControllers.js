const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const contact = await getById(req.params.contactId);
  if (contact.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
};

const deleteContact = async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
};

const refurbishContact = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    return res.status(404).json({ message: "Missing fields" });
  }

  const newContact = await updateContact(req.params.contactId, req.body);

  if (!newContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(newContact);
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  refurbishContact,
};
