const Contact = require("../../db/schemas");

const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);

  res.status(201).json(contact);
};

module.exports = {
  createContact,
};
