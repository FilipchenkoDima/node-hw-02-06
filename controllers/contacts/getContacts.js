const { Contact } = require("../../db/schemas");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { limit = 20, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner }).skip(skip).limit(limit);

  res.status(200).json(contacts);
};

module.exports = {
  getContacts,
};
