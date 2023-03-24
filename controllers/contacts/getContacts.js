const Contact = require("../../db/schemas");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});

  res.status(200).json(contacts);
};

module.exports = {
  getContacts,
};
