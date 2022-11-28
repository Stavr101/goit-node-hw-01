const { log } = require("console");
const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  if (!result) {
    return null;
  }
  // return result || null;
  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  ///////////////////
  //   const newContact = contacts.filter((item) => item.id !== id);
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  //////////////////
  return removeContact;

  // ...твой код
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...data };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
