const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) {
      return null;
    }

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return contactToRemove;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: Date.now(), name, email, phone };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
