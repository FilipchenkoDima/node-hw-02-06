const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const getContacts = async () => {
  try {
    const contactsJSON = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsJSON);

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    const contactsList = await getContacts();

    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (contactId) => {
  try {
    const contactsList = await getContacts();
    const contact = contactsList.filter(
      ({ id }) => String(id) === String(contactId)
    );

    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await getContacts();
    const newContacts = contactsList.filter(
      ({ id }) => String(id) !== String(contactId)
    );

    if (newContacts.length === contactsList.length) {
      return null;
    }
    fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return contactsList;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await getContacts();
    const { name, email, phone } = body;
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };

    contactsList.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contactsList));

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const contactsList = await getContacts();
  const { name, email, phone } = body;

  contactsList.forEach((contact) => {
    if (String(contact.id) === String(contactId)) {
      if (name) contact.name = name;
      if (email) contact.email = email;
      if (phone) contact.phone = phone;
    }
  });
  fs.writeFile(contactsPath, JSON.stringify(contactsList));

  const contact = contactsList.filter(
    ({ id }) => String(id) === String(contactId)
  );

  if (contact.length === 0) return null;

  return contact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
