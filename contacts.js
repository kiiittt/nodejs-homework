
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((error) => {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    });
}

function getContactById(contactId) {
  return listContacts()
    .then((contacts) => contacts.find((contact) => contact.id === contactId))
    .catch((error) => {
      throw error;
    });
}

function removeContact(contactId) {
  return listContacts().then((contacts) => {
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) {
      return null;
    }

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    return fs
      .writeFile(contactsPath, JSON.stringify(updatedContacts))
      .then(() => contactToRemove)
      .catch((error) => {
        throw error;
      });
  });
}

function addContact(name, email, phone) {
  const newContact = { id: Date.now(), name, email, phone };

  return listContacts().then((contacts) => {
    const updatedContacts = [...contacts, newContact];
    return fs
      .writeFile(contactsPath, JSON.stringify(updatedContacts))
      .then(() => newContact)
      .catch((error) => {
        throw error;
      });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
