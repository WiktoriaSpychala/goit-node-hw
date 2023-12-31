const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        console.table(contacts);
        return contacts;
    } catch (error) {
        console.error(error)
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const contact = contacts.find((item) => item.id === contactId);
        console.log(contact);
        return contact;
    } catch (error) {
        console.error(error);
    }
}
async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const filtredContacts = contacts.filter((item) => item.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(filtredContacts, null, 2));
        console.log(`Contact with id ${contactId} has been removed`);
    } catch (error) {
        console.error(error);
    }
}
async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,

        };
        const newContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        console.log(`New contact has been added: ${newContact.name}`);
        return newContacts;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};