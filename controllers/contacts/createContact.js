const { Contact } = require("../../db/schemas");

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  req.body.owner = owner;

  const contact = await Contact.create(req.body);

  res.status(201).json(contact);
};

module.exports = {
  createContact,
};
